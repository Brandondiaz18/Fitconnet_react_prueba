import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Ocultar navbar en las páginas de Login y Registro
  if (location.pathname === "/login" || location.pathname === "/register") return null;

  // Ocultar navbar en los apartados de "Nuestros Servicios"
  // (páginas con su propio header): ejercicios, dietas y rutinas
  const hideOnServices = ["/ejercicios", "/dietas", "/rutinas"];
  if (hideOnServices.some(prefix => location.pathname.startsWith(prefix))) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const token = localStorage.getItem("token");

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="brand">
          FitConnet
        </Link>

        {/* Botón menú móvil */}
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          ☰
        </button>

        {/* Links principales */}
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" className="nav-link">Inicio</Link>

          {!token ? (
            <>
              <Link to="/login" className="nav-link">Iniciar sesión</Link>
              <Link to="/register" className="nav-link">Registrarse</Link>
            </>
          ) : (
            <>
              {location.pathname !== "/compras" && (
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
              )}
              <button onClick={handleLogout} className="btn-primary">Cerrar sesión</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
