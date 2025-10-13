import React, { useState, useEffect, useRef } from "react";
import "./Admin.css";

const Admin = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const carouselRef = useRef(null);
  const items = ["Gestión de Usuarios", "Gestión de Planes", "Configuraciones", "Reportes"];

  // Manejo de menú desplegable
  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  // Funcionalidad del carrusel
  const nextItem = () => {
    setIndex((prev) => (prev + 1) % items.length);
  };

  const prevItem = () => {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  // Funciones de navegación
  const goToProfile = () => {
    alert("Ir al perfil del administrador");
    // Ejemplo de navegación futura: navigate('/perfil/admin')
  };

  const logout = () => {
    alert("Sesión cerrada correctamente.");
    // Ejemplo de navegación futura: navigate('/login')
  };

  return (
    <div>
      {/* Barra de navegación */}
      <header className="navbar">
        <div className="logo-container">
          <img src="/img/logo.png" alt="FitConnet" className="logo" />
        </div>

        {/* Botón menú */}
        <div className="menu-container">
          <button className="menu-btn" onClick={toggleMenu}>
            ☰ Menú
          </button>
          <ul className={`dropdown ${menuOpen ? "show" : ""}`}>
            <li><a href="#">Gestión de Usuarios</a></li>
            <li><a href="#">Gestión de Planes</a></li>
            <li><a href="#">Configuraciones</a></li>
            <li><a href="#">Reportes</a></li>
          </ul>
        </div>

        {/* Navegación */}
        <nav>
          <a href="#">Inicio</a>
          <a href="#">Nuestros Servicios</a>
          <a href="#">Nuestros Planes</a>
          <a href="#">Contacto</a>
        </nav>

        {/* Botones */}
        <div className="actions">
          <img
            src="/img/Profile_user.png"
            alt="Perfil"
            className="profile-pic"
            onClick={goToProfile}
          />
          <img
            src="/img/Cerrar_sesion.png"
            alt="Cerrar Sesión"
            className="logout-btn"
            onClick={logout}
          />
        </div>
      </header>

      {/* Contenido principal */}
      <main className="content">
        <h1>Bienvenido Administrador</h1>

        {/* Carrusel */}
        <div className="carousel">
          <div
            className="carousel-track"
            ref={carouselRef}
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {items.map((item, i) => (
              <div className="carousel-item" key={i}>
                {item}
              </div>
            ))}
          </div>

          <button className="carousel-btn prev" onClick={prevItem}>
            &#10094;
          </button>
          <button className="carousel-btn next" onClick={nextItem}>
            &#10095;
          </button>
        </div>
      </main>
    </div>
  );
};

export default Admin;
