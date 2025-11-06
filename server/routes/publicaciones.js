import express from 'express';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Crear publicación
router.post('/', requireAuth, async (req, res) => {
  try {
    const { contenido, imagen_url } = req.body;
    if (!contenido || typeof contenido !== 'string') {
      return res.status(400).json({ message: 'contenido requerido' });
    }
    const [result] = await pool.query(
      'INSERT INTO publicaciones (id_usuario, contenido, imagen_url) VALUES (?, ?, ?)',
      [req.user.id, contenido, imagen_url || null]
    );
    const id = result.insertId;
    const [rows] = await pool.query(
      `SELECT p.id_publicacion as id, p.contenido, p.imagen_url, p.created_at,
              u.nombre as autor
         FROM publicaciones p
         JOIN usuarios u ON u.id_usuario = p.id_usuario
        WHERE p.id_publicacion = ?`,
      [id]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creando publicación' });
  }
});

// Feed de publicaciones
router.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT p.id_publicacion as id, p.contenido, p.imagen_url, p.created_at,
              u.nombre as autor,
              COALESCE(likes.cnt, 0) as likes
         FROM publicaciones p
         JOIN usuarios u ON u.id_usuario = p.id_usuario
         LEFT JOIN (
           SELECT id_publicacion, COUNT(*) as cnt FROM reacciones GROUP BY id_publicacion
         ) likes ON likes.id_publicacion = p.id_publicacion
        ORDER BY p.created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo publicaciones' });
  }
});

// Detalle de publicación
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const [[pub]] = await pool.query(
      `SELECT p.id_publicacion as id, p.contenido, p.imagen_url, p.created_at,
              u.nombre as autor
         FROM publicaciones p
         JOIN usuarios u ON u.id_usuario = p.id_usuario
        WHERE p.id_publicacion = ?`,
      [id]
    );
    if (!pub) return res.status(404).json({ message: 'Publicación no encontrada' });
    const [comentarios] = await pool.query(
      `SELECT c.id_comentario as id, c.contenido, c.created_at, u.nombre as autor
         FROM comentarios c
         JOIN usuarios u ON u.id_usuario = c.id_usuario
        WHERE c.id_publicacion = ?
        ORDER BY c.created_at ASC`,
      [id]
    );
    const [[likeCount]] = await pool.query(
      'SELECT COUNT(*) as likes FROM reacciones WHERE id_publicacion = ?',
      [id]
    );
    res.json({ ...pub, comentarios, likes: likeCount.likes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo publicación' });
  }
});

// Actualizar publicación (solo dueño)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { contenido, imagen_url } = req.body;
    const [[own]] = await pool.query(
      'SELECT 1 FROM publicaciones WHERE id_publicacion = ? AND id_usuario = ?',
      [id, req.user.id]
    );
    if (!own) return res.status(403).json({ message: 'No autorizado' });
    const [result] = await pool.query(
      'UPDATE publicaciones SET contenido = ?, imagen_url = ? WHERE id_publicacion = ?',
      [contenido, imagen_url || null, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'No encontrada' });
    res.json({ id, contenido, imagen_url: imagen_url || null });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error actualizando publicación' });
  }
});

// Eliminar publicación (solo dueño)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const [[own]] = await pool.query(
      'SELECT 1 FROM publicaciones WHERE id_publicacion = ? AND id_usuario = ?',
      [id, req.user.id]
    );
    if (!own) return res.status(403).json({ message: 'No autorizado' });
    await pool.query('DELETE FROM publicaciones WHERE id_publicacion = ?', [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error eliminando publicación' });
  }
});

// Comentarios
router.get('/:id/comentarios', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const [rows] = await pool.query(
      `SELECT c.id_comentario as id, c.contenido, c.created_at, u.nombre as autor
         FROM comentarios c
         JOIN usuarios u ON u.id_usuario = c.id_usuario
        WHERE c.id_publicacion = ?
        ORDER BY c.created_at ASC`,
      [id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo comentarios' });
  }
});

router.post('/:id/comentarios', requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { contenido } = req.body;
    if (!contenido) return res.status(400).json({ message: 'contenido requerido' });
    const [result] = await pool.query(
      'INSERT INTO comentarios (id_publicacion, id_usuario, contenido) VALUES (?, ?, ?)',
      [id, req.user.id, contenido]
    );
    res.status(201).json({ id: result.insertId, contenido });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creando comentario' });
  }
});

// Reacciones (like/unlike)
router.post('/:id/reacciones', requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { accion } = req.body; // 'like' | 'unlike'
    if (accion === 'unlike') {
      await pool.query('DELETE FROM reacciones WHERE id_publicacion = ? AND id_usuario = ?', [id, req.user.id]);
      return res.json({ liked: false });
    }
    // like por defecto
    await pool.query('INSERT IGNORE INTO reacciones (id_publicacion, id_usuario, tipo) VALUES (?, ?, "like")', [id, req.user.id]);
    res.json({ liked: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error procesando reacción' });
  }
});

export default router;