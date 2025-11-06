import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Token requerido' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    req.user = { id: payload.id, correo: payload.correo, rol: payload.rol };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

export function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || !req.user.rol) {
      return res.status(403).json({ message: 'No autorizado' });
    }
    if (req.user.rol !== role) {
      return res.status(403).json({ message: 'Rol insuficiente' });
    }
    next();
  };
}