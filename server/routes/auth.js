import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    if (!correo || !contrasena) {
      return res.status(400).json({ message: 'Correo y contraseña requeridos' });
    }

    const [rows] = await pool.query('SELECT id, nombre, correo, password_hash FROM usuarios WHERE correo = ?', [correo]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    const user = rows[0];

    const ok = await bcrypt.compare(contrasena, user.password_hash);
    if (!ok) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user.id, correo: user.correo }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });
    res.json({ access_token: token, user: { id: user.id, nombre: user.nombre, correo: user.correo } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

export default router;