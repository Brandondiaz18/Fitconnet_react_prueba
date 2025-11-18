import React from "react";
import "./rutinas.css"; // Ajusta la ruta según tu estructura

const Rutinas = () => {
  return (
    <div className="rutinas-page">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">
          <img src="/img/logo.png" alt="FitConnet Logo" />
          <h1>FitConnet</h1>
        </div>
        <nav>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="#">Nuestros Servicios</a></li>
            <li><a href="#">Nuestros Planes</a></li>
            <li><a href="#">Contacto</a></li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); window.openFitChat?.(); }}>
                Chat
              </a>
            </li>
            <li><a href="#">Perfil</a></li>
            <li><a href="#">Cerrar Sesión</a></li>
          </ul>
        </nav>
      </header>

      {/* MAIN */}
      <main className="main-content">
        <h2>Rutinas Personalizadas</h2>
        <p>
          Selecciona una rutina según tu nivel y objetivo. Cada plan está diseñado
          para ayudarte a mejorar de forma progresiva.
        </p>

        <div className="rutinas-container">
          {/* Rutina Principiante */}
          <div className="rutina-card">
            <img
              src="https://images.unsplash.com/photo-1594737625785-c25ca9ddfc0a"
              alt="Principiante"
            />
            <h3>Rutina Principiante</h3>
            <p>
              Ideal para quienes inician su camino fitness. Enfocada en fuerza básica y movilidad.
            </p>
            <a href="#" className="btn">
              Ver más
            </a>
          </div>

          {/* Rutina Intermedia */}
          <div className="rutina-card">
            <img
              src="https://images.unsplash.com/photo-1579758629934-095f6b8f9eda"
              alt="Intermedia"
            />
            <h3>Rutina Intermedia</h3>
            <p>
              Perfecta para usuarios con experiencia media. Mejora la fuerza y resistencia muscular.
            </p>
            <a href="#" className="btn">
              Ver más
            </a>
          </div>

          {/* Rutina Avanzada */}
          <div className="rutina-card">
            <img
              src="https://images.unsplash.com/photo-1579758629934-56c1f430c88a"
              alt="Avanzada"
            />
            <h3>Rutina Avanzada</h3>
            <p>
              Para atletas que buscan rendimiento máximo. Entrenamientos intensos y desafiantes.
            </p>
            <a href="#" className="btn">
              Ver más
            </a>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 FitConnet - Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Rutinas;
