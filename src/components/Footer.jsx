import React from "react";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  // Oculta el footer en las páginas de Login y Registro
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <footer className="footer">
      <div className="container">
        <p className="text-sm">
          © {new Date().getFullYear()} <strong>FitConnet</strong> — Todos los derechos reservados
        </p>
        <p className="muted">
          Hecho con 💪 y dedicación para mejorar tu rendimiento físico.
        </p>
      </div>
    </footer>
  );
}
