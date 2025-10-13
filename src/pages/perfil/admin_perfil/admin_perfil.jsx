import React, { useState } from "react";
import "./admin_perfil.css";

const AdminPerfil = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".menu-container")) {
      setMenuOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const editProfile = () => {
    alert("Redirigiendo a editar perfil...");
    // Ejemplo: window.location.href = '/editar-perfil';
  };

  const goToProfile = () => {
    window.location.reload();
  };

  const logout = () => {
    if (window.confirm("¿Estás seguro que deseas cerrar sesión?")) {
      alert("Sesión cerrada correctamente.");
      window.location.href = "/login";
    }
  };

  return (
    <div>
      {/* Barra de navegación */}
      <header className="navbar">
        <div className="logo-container">
          <img src="/img/logo.png" alt="Fitconnet" className="logo" />
        </div>

        <div className="menu-container">
          <button className="menu-btn" onClick={handleMenuToggle}>
            ☰ Menú
          </button>
          <ul className={`dropdown ${menuOpen ? "show" : ""}`}>
            <li><a href="#">Gestión de Usuarios</a></li>
            <li><a href="#">Gestión de Planes</a></li>
            <li><a href="#">Configuraciones</a></li>
            <li><a href="#">Reportes</a></li>
          </ul>
        </div>

        <nav>
          <a href="/principal/admin/Admin.html">Inicio</a>
          <a href="#">Nuestros Servicios</a>
          <a href="#">Nuestros Planes</a>
          <a href="#">Contacto</a>
        </nav>

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

      {/* Contenedor del perfil */}
      <div className="profile-container">
        {/* Header del perfil */}
        <div className="profile-header">
          <img
            src="/img/Profile_user.png"
            alt="Foto de perfil"
            className="profile-photo"
          />
          <h1 className="username">carlosbelcast</h1>
          <span className="verified">✓ Verificado</span>
          <p className="user-type">Administrador</p>

          <div className="stats">
            <div className="stat-item">
              <div className="stat-number">1030</div>
              <div className="stat-label">Publicaciones</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1000</div>
              <div className="stat-label">Seguidores</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">300</div>
              <div className="stat-label">Seguidos</div>
            </div>
          </div>

          <button className="edit-profile-btn" onClick={editProfile}>
            Editar Perfil
          </button>
        </div>

        {/* Información personal */}
        <div className="info-section">
          <h2>Información Personal</h2>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">Email</div>
              <div className="info-value">admin@fitconnet.com</div>
            </div>
            <div className="info-item">
              <div className="info-label">Teléfono</div>
              <div className="info-value">+57 300 123 4567</div>
            </div>
            <div className="info-item">
              <div className="info-label">Fecha de registro</div>
              <div className="info-value">15 de Enero, 2024</div>
            </div>
            <div className="info-item">
              <div className="info-label">Última actividad</div>
              <div className="info-value">Hoy, 14:30</div>
            </div>
          </div>
        </div>

        {/* Galería */}
        <div className="gallery-section">
          <h2>Registro de Avances</h2>
          <div className="gallery-grid">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div className="gallery-item" key={num}>
                <img
                  src={`https://via.placeholder.com/150/330033/FFFFFF?text=Foto+${num}`}
                  alt={`Avance ${num}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPerfil;
