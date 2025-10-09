import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const token = localStorage.getItem("token");

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-purple-500">
          FitConnet
        </Link>

        {/* Botón menú móvil */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Links principales */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:space-x-6 space-y-4 md:space-y-0 mt-4 md:mt-0 text-center`}
        >
          <Link to="/" className="hover:text-purple-400 transition">
            Inicio
          </Link>

          {!token ? (
            <>
              <Link to="/login" className="hover:text-purple-400 transition">
                Iniciar sesión
              </Link>
              <Link to="/register" className="hover:text-purple-400 transition">
                Registrarse
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="hover:text-purple-400 transition">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-purple-600 px-3 py-1 rounded-md hover:bg-purple-700 transition"
              >
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
