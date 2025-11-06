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
    const [rows] = await pool.query('SELECT id_usuario as id, nombre, correo, password_hash, rol FROM usuarios WHERE correo = ?', [correo]);
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

    const token = jwt.sign({ id: user.id, correo: user.correo, rol: user.rol }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });
    await pool.query('INSERT INTO login_intentos (correo, id_usuario, exito) VALUES (?, ?, 1)', [correo, user.id]);
    res.json({ access_token: token, user: { id: user.id, nombre: user.nombre, correo: user.correo, rol: user.rol } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

export default router;