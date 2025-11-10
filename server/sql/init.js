import pool from '../db.js';
import fs from 'fs';
import path from 'path';

async function tableExists(tableName) {
  const [rows] = await pool.query('SHOW TABLES LIKE ?', [tableName]);
  return rows.length > 0;
}

async function getColumns(tableName) {
  const [rows] = await pool.query('SHOW COLUMNS FROM `' + tableName + '`');
  return rows.map(r => r.Field);
}

async function hasUniqueIndex(tableName, columnName) {
  const [rows] = await pool.query('SHOW INDEX FROM `' + tableName + '`');
  return rows.some(r => r.Column_name === columnName && r.Non_unique === 0);
}

export async function ensureUsuariosSchema() {
  const exists = await tableExists('usuarios');
  if (!exists) {
    const schemaPath = path.resolve(path.dirname(new URL(import.meta.url).pathname), 'schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');
    await pool.query(sql);
    return;
  }
  const [keyRows] = await pool.query('SHOW KEYS FROM `usuarios` WHERE Key_name = "PRIMARY"');
  const pkCol = keyRows[0]?.Column_name;
  const [colRows] = await pool.query('SHOW COLUMNS FROM `usuarios`');
  console.log('[DB] usuarios columnas:', colRows.map(r => `${r.Field}:${r.Type}:${r.Extra}`).join(', '));
  console.log('[DB] usuarios PK:', pkCol || 'none');
  const cols = colRows.map(r => r.Field);

  const hasCorreo = cols.includes('correo');
  const hasCorreoElectronico = cols.includes('correo_electronico');
  const hasPasswordHash = cols.includes('password_hash');
  const hasContrasena = cols.includes('contrasena');

  // nombre
  if (!cols.includes('nombre')) {
    try { await pool.query('ALTER TABLE `usuarios` ADD COLUMN `nombre` VARCHAR(100) NOT NULL'); } catch (e) { console.error('Error agregando nombre:', e); }
  }
  // correo: solo agregar si NO existe ninguna variante
  if (!hasCorreo && !hasCorreoElectronico) {
    try { await pool.query('ALTER TABLE `usuarios` ADD COLUMN `correo` VARCHAR(150) NOT NULL'); } catch (e) { console.error('Error agregando correo:', e); }
  }
  // password: solo agregar password_hash si NO existe contrasena ni password_hash
  if (!hasPasswordHash && !hasContrasena) {
    try { await pool.query('ALTER TABLE `usuarios` ADD COLUMN `password_hash` VARCHAR(255) NOT NULL'); } catch (e) { console.error('Error agregando password_hash:', e); }
  }
  // Optional profile columns
  const optionalCols = [
    ['genero', 'VARCHAR(20) NULL'],
    ['peso', 'INT NULL'],
    ['altura', 'INT NULL'],
    ['edad', 'INT NULL'],
    ['horas_dormir', 'INT NULL'],
    ['vasos_agua', 'INT NULL'],
    ['created_at', 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP']
  ];
  for (const [name, type] of optionalCols) {
    if (!cols.includes(name)) {
      try { await pool.query(`ALTER TABLE \`usuarios\` ADD COLUMN \`${name}\` ${type}`); } catch (e) { /* ignore optional */ }
    }
  }

  // Ensure unique index en correo si existe esa columna
  if (hasCorreo) {
    const uniqueCorreo = await hasUniqueIndex('usuarios', 'correo');
    if (!uniqueCorreo) {
      try { await pool.query('ALTER TABLE `usuarios` ADD UNIQUE (`correo`)'); } catch (e) { /* ignore */ }
    }
  }
  // Si existe correo_electronico, asegurar índice único también
  if (hasCorreoElectronico) {
    const uniqueCorreoE = await hasUniqueIndex('usuarios', 'correo_electronico');
    if (!uniqueCorreoE) {
      try { await pool.query('ALTER TABLE `usuarios` ADD UNIQUE (`correo_electronico`)'); } catch (e) { /* ignore */ }
    }
  }
}

export async function ensurePublicacionesSchema() {
  // Tabla publicaciones
  if (!(await tableExists('publicaciones'))) {
    await pool.query(`CREATE TABLE IF NOT EXISTS publicaciones (
      id_publicacion INT AUTO_INCREMENT PRIMARY KEY,
      id_usuario INT NOT NULL,
      contenido TEXT NOT NULL,
      imagen_url VARCHAR(255) NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);
  }
  // Tabla comentarios
  if (!(await tableExists('comentarios'))) {
    await pool.query(`CREATE TABLE IF NOT EXISTS comentarios (
      id_comentario INT AUTO_INCREMENT PRIMARY KEY,
      id_publicacion INT NOT NULL,
      id_usuario INT NOT NULL,
      contenido TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
  }
  // Tabla reacciones (like)
  if (!(await tableExists('reacciones'))) {
    await pool.query(`CREATE TABLE IF NOT EXISTS reacciones (
      id_usuario INT NOT NULL,
      id_publicacion INT NOT NULL,
      tipo ENUM('like') DEFAULT 'like',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id_usuario, id_publicacion)
    )`);
  }
}

export async function ensureSecuritySchema() {
  // Tabla de intentos de login
  if (!(await tableExists('login_intentos'))) {
    await pool.query(`CREATE TABLE IF NOT EXISTS login_intentos (
      id_intento INT AUTO_INCREMENT PRIMARY KEY,
      correo VARCHAR(150) NULL,
      id_usuario INT NULL,
      exito TINYINT(1) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
  }
}