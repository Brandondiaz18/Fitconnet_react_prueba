import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';
import { requireRole } from '../middleware/auth.js';

const router = express.Router();

// Registrar usuario
router.post('/', async (req, res) => {
  try {
    const { nombre, correo, contrasena, edad, peso, altura, genero, rol } = req.body;
    if (!nombre || !correo || !contrasena) return res.status(400).json({ message: 'nombre, correo y contrasena requeridos' });

    // Detectar columnas disponibles
    const [colRows] = await pool.query('SHOW COLUMNS FROM `usuarios`');
    const cols = new Set(colRows.map(r => r.Field));
    const hasCorreo = cols.has('correo');
    const hasCorreoElectronico = cols.has('correo_electronico');

    // Verificar existencia de correo en cualquiera de las columnas
    let existsQuery = null;
    let existsParams = [];
    if (hasCorreo && hasCorreoElectronico) {
      existsQuery = 'SELECT 1 FROM usuarios WHERE correo = ? OR correo_electronico = ?';
      existsParams = [correo, correo];
    } else if (hasCorreo) {
      existsQuery = 'SELECT 1 FROM usuarios WHERE correo = ?';
      existsParams = [correo];
    } else if (hasCorreoElectronico) {
      existsQuery = 'SELECT 1 FROM usuarios WHERE correo_electronico = ?';
      existsParams = [correo];
    }
    if (existsQuery) {
      const [exists] = await pool.query(existsQuery, existsParams);
      if (exists.length) return res.status(409).json({ message: 'Correo ya registrado' });
    }

    const password_hash = await bcrypt.hash(contrasena, 10);

    // Construir INSERT dinámico según columnas disponibles
    const insertCols = ['nombre', 'password_hash'];
    const insertVals = [nombre, password_hash];
    if (hasCorreo) { insertCols.push('correo'); insertVals.push(correo); }
    if (hasCorreoElectronico) { insertCols.push('correo_electronico'); insertVals.push(correo); }

    // Campos opcionales si existen en el schema y vienen en el body
    const optionalFields = [
      ['edad', edad],
      ['peso', peso],
      ['altura', altura],
      ['genero', genero],
      ['horas_dormir', req.body?.horas_dormir],
      ['vasos_agua', req.body?.vasos_agua],
    ];
    for (const [field, value] of optionalFields) {
      if (value !== undefined && cols.has(field)) {
        insertCols.push(field);
        insertVals.push(value);
      }
    }

    // rol si existe la columna y viene en el body
    if (cols.has('rol')) {
      const rolVal = (rol === 'admin' || rol === 'usuario') ? rol : 'usuario';
      insertCols.push('rol');
      insertVals.push(rolVal);
    }

    const placeholders = insertCols.map(() => '?').join(', ');
    const sql = `INSERT INTO usuarios (${insertCols.join(', ')}) VALUES (${placeholders})`;
    const [result] = await pool.query(sql, insertVals);

    res.status(201).json({ id: result.insertId, nombre, correo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registrando usuario' });
  }
});

// Obtener perfil propio
router.get('/me', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id_usuario as id, nombre, IFNULL(correo, correo_electronico) as correo, genero, peso, altura, edad, horas_dormir, vasos_agua FROM usuarios WHERE id_usuario = ?', [req.user.id]);
    if (!rows.length) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo usuario' });
  }
});

// Obtener usuario por email
router.get('/by-email', async (req, res) => {
  try {
    const { correo } = req.query;
    if (!correo) return res.status(400).json({ message: 'correo requerido' });

    // Detectar columnas
    const [colRows] = await pool.query('SHOW COLUMNS FROM `usuarios`');
    const cols = new Set(colRows.map(r => r.Field));
    const hasCorreo = cols.has('correo');
    const hasCorreoElectronico = cols.has('correo_electronico');

    let whereClause = '';
    let params = [];
    if (hasCorreo && hasCorreoElectronico) {
      whereClause = 'WHERE correo = ? OR correo_electronico = ?';
      params = [correo, correo];
    } else if (hasCorreo) {
      whereClause = 'WHERE correo = ?';
      params = [correo];
    } else if (hasCorreoElectronico) {
      whereClause = 'WHERE correo_electronico = ?';
      params = [correo];
    } else {
      return res.status(404).json({ message: 'Estructura de usuarios sin columna de correo' });
    }

    const [rows] = await pool.query(`SELECT id_usuario as id, nombre, IFNULL(correo, correo_electronico) as correo, genero, peso, altura, edad, horas_dormir, vasos_agua FROM usuarios ${whereClause}`, params);
    if (!rows.length) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo usuario' });
  }
});

// Actualizar perfil
router.put('/update', requireAuth, async (req, res) => {
  try {
    const allowed = ['nombre','correo','genero','peso','altura','edad','horas_dormir','vasos_agua'];
    const entries = Object.entries(req.body).filter(([k]) => allowed.includes(k));
    if (!entries.length) return res.status(400).json({ message: 'No hay campos válidos para actualizar' });

    const fields = entries.map(([k]) => `${k} = ?`).join(', ');
    const values = entries.map(([,v]) => v);

    const [result] = await pool.query(`UPDATE usuarios SET ${fields} WHERE id_usuario = ?`, [...values, req.user.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

    const [rows] = await pool.query('SELECT id_usuario as id, nombre, correo, genero, peso, altura, edad, horas_dormir, vasos_agua FROM usuarios WHERE id_usuario = ?', [req.user.id]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error actualizando usuario' });
  }
});

// Eliminar cuenta propia
router.delete('/me', requireAuth, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [req.user.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error eliminando cuenta' });
  }
});

// Eliminar usuario (admin)
router.delete('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const [result] = await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error eliminando usuario' });
  }
});

export default router;