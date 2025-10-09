import React from "react";
import "./perfil.css";

export default function Perfil() {
  // Función para editar perfil
  const editProfile = () => {
    alert("Redirigiendo a editar perfil...");
    // window.location.href = '/editar_perfil';
  };

  // Función para ir al perfil
  const goToProfile = () => {
    window.location.reload();
  };

  // Función para ir al inicio
  const goToHome = () => {
    window.location.href = "/principal/user";
  };

  // Cerrar sesión
  const logout = () => {
    if (confirm("¿Estás seguro que deseas cerrar sesión?")) {
      alert("Sesión cerrada correctamente.");
      window.location.href = "/login";
    }
  };

  // Menú desplegable (manejado con React state)
  const [menuOpen, setMenuOpen] = React.useState(false);
  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".menu-container")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div>
      {/* Navbar */}
      <header className="section1">
        <div className="menu-container">
          <div className="menu-button" onClick={toggleMenu}>
            ☰
          </div>
          {menuOpen && (
            <div className="menu-content">
              <a href="#">Mis Entrenamientos</a>
              <a href="#">Mi Plan</a>
              <a href="#">Progreso</a>
            </div>
          )}
        </div>

        <img src="/img/logo.png" className="logo" alt="Logo Fitconnet" />

        <div className="center-buttons">
          <button onClick={goToHome}>Inicio</button>
          <button>Nuestros Servicios</button>
          <button>Nuestros Planes</button>
          <button>Contacto</button>
        </div>

        <div className="right-buttons">
          <button onClick={goToProfile}>Perfil</button>
          <button onClick={logout}>Cerrar Sesión</button>
        </div>
      </header>

      {/* Contenedor del perfil */}
      <div className="profile-container">
        {/* Header del perfil */}
        <div className="profile-header">
          <div className="profile-photo-container">
            <img
              src="/img/Profile_user.png"
              alt="Foto de perfil"
              className="profile-photo"
            />
            <div className="photo-badge">+</div>
          </div>

          <div className="profile-main-info">
            <h1 className="username">
              carlosbelcast <span className="verified">✓</span>
            </h1>
            <p className="user-type">Deportista</p>

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

          <div className="progress-chart">
            <img
              src="https://via.placeholder.com/150/6a5acd/FFFFFF?text=Grafico"
              alt="Registro de avances"
            />
            <p>Registro de Avances</p>
          </div>
        </div>

        {/* Información personal */}
        <div className="info-section">
          <h2>Información Personal</h2>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">Email</div>
              <div className="info-value">usuario@fitconnet.com</div>
            </div>
            <div className="info-item">
              <div className="info-label">Teléfono</div>
              <div className="info-value">+57 300 987 6543</div>
            </div>
            <div className="info-item">
              <div className="info-label">Plan Actual</div>
              <div className="info-value">Premium Mensual</div>
            </div>
            <div className="info-item">
              <div className="info-label">Fecha de registro</div>
              <div className="info-value">20 de Marzo, 2024</div>
            </div>
            <div className="info-item">
              <div className="info-label">Objetivo</div>
              <div className="info-value">Aumento de masa muscular</div>
            </div>
            <div className="info-item">
              <div className="info-label">Entrenador Asignado</div>
              <div className="info-value">Juan Pérez</div>
            </div>
          </div>
        </div>

        {/* Sección de logros */}
        <div className="achievements-section">
          <h2>Mis Logros</h2>
          <div className="achievements-grid">
            <div className="achievement-item">
              <div className="achievement-icon">🏆</div>
              <p>Primera semana</p>
            </div>
            <div className="achievement-item">
              <div className="achievement-icon">💪</div>
              <p>10 entrenamientos</p>
            </div>
            <div className="achievement-item">
              <div className="achievement-icon">🔥</div>
              <p>Racha de 7 días</p>
            </div>
            <div className="achievement-item locked">
              <div className="achievement-icon">⭐</div>
              <p>Bloqueado</p>
            </div>
          </div>
        </div>

        {/* Galería */}
        <div className="gallery-section">
          <h2>Mis Publicaciones</h2>
          <div className="gallery-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="gallery-item">
                <img
                  src={`https://via.placeholder.com/150/6a5acd/FFFFFF?text=Foto+${i}`}
                  alt={`Publicación ${i}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
