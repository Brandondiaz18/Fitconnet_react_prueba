import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body;
  if (!correo || !contrasena) {
    return res.status(400).json({ message: 'Correo y contraseña requeridos' });
  }
  try {
    // Detectar columnas disponibles
    const [colRows] = await pool.query('SHOW COLUMNS FROM `usuarios`');
    const cols = new Set(colRows.map(r => r.Field));
    const idCol = cols.has('id_usuario') ? 'id_usuario' : (cols.has('id') ? 'id' : 'id_usuario');
    const correoCol = cols.has('correo') ? 'correo' : (cols.has('correo_electronico') ? 'correo_electronico' : 'correo');
    const pwdCol = cols.has('password_hash') ? 'password_hash' : (cols.has('contrasena') ? 'contrasena' : 'password_hash');
    const hasRolCol = cols.has('rol');

    const [rows] = await pool.query(`SELECT ${idCol} as id, nombre, ${correoCol} as correo, ${pwdCol} as password_hash ${hasRolCol ? ', rol' : ''} FROM usuarios WHERE ${correoCol} = ?`, [correo]);
    if (rows.length === 0) {
      await pool.query('INSERT INTO login_intentos (correo, id_usuario, exito) VALUES (?, NULL, 0)', [correo]);
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    const user = rows[0];

    const ok = await bcrypt.compare(contrasena, user.password_hash);
    if (!ok) {
      await pool.query('INSERT INTO login_intentos (correo, id_usuario, exito) VALUES (?, ?, 0)', [correo, user.id]);
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Obtener rol si está normalizado en tablas
    let rol = hasRolCol ? user.rol : 'usuario';
    try {
      const [rolesTbl] = await pool.query('SHOW TABLES LIKE "rol_usuarios"');
      const [userRolTbl] = await pool.query('SHOW TABLES LIKE "usuario_rol"');
      if (rolesTbl.length && userRolTbl.length) {
        const [r] = await pool.query('SELECT ru.rol FROM rol_usuarios ru JOIN usuario_rol ur ON ru.id_rol = ur.id_rol WHERE ur.id_usuario = ? LIMIT 1', [user.id]);
        if (r.length) rol = r[0].rol;
      }
    } catch (_) { /* ignore */ }

    const token = jwt.sign({ id: user.id, correo: user.correo, rol }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });
    await pool.query('INSERT INTO login_intentos (correo, id_usuario, exito) VALUES (?, ?, 1)', [correo, user.id]);
    res.json({ access_token: token, user: { id: user.id, nombre: user.nombre, correo: user.correo, rol } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

export default router;