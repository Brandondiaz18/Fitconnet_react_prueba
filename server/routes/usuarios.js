import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Registrar usuario
router.post('/', async (req, res) => {
  try {
    const { nombre, correo, contrasena } = req.body;
    if (!nombre || !correo || !contrasena) return res.status(400).json({ message: 'nombre, correo y contrasena requeridos' });

    const [exists] = await pool.query('SELECT id FROM usuarios WHERE correo = ?', [correo]);
    if (exists.length) return res.status(409).json({ message: 'Correo ya registrado' });

    const password_hash = await bcrypt.hash(contrasena, 10);
    const [result] = await pool.query('INSERT INTO usuarios (nombre, correo, password_hash) VALUES (?, ?, ?)', [nombre, correo, password_hash]);
    res.status(201).json({ id: result.insertId, nombre, correo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registrando usuario' });
  }
});

// Obtener perfil propio
router.get('/me', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, nombre, correo, genero, peso, altura, edad, horas_dormir, vasos_agua FROM usuarios WHERE id = ?', [req.user.id]);
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
    const [rows] = await pool.query('SELECT id, nombre, correo, genero, peso, altura, edad, horas_dormir, vasos_agua FROM usuarios WHERE correo = ?', [correo]);
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

    const [result] = await pool.query(`UPDATE usuarios SET ${fields} WHERE id = ?`, [...values, req.user.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

    const [rows] = await pool.query('SELECT id, nombre, correo, genero, peso, altura, edad, horas_dormir, vasos_agua FROM usuarios WHERE id = ?', [req.user.id]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error actualizando usuario' });
  }
});

export default router;