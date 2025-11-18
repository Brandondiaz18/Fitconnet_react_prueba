import React from "react";
import "./dietas.css"; // Ajusta la ruta según tu estructura

const Dietas = () => {
  return (
    <div className="dietas-page">
      <header>
        <div className="logo">
          <img src="/img/logo.png" alt="FitConnet Logo" />
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
            <li><a href="/perfil">Perfil</a></li>
            <li><a href="/login">Cerrar Sesión</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <h1>Dietas Personalizadas</h1>
        <p className="intro">
          En <strong>FitConnet</strong> entendemos que la alimentación es tan importante como el ejercicio.{" "}
          Aquí encontrarás planes alimenticios adaptados a tus objetivos físicos y necesidades nutricionales.
        </p>

        <section className="dietas-container">
          <div className="dieta-card">
            <img src="/img/dieta_definicion.jpg" alt="Dieta de definición" />
            <h2>Dieta de Definición</h2>
            <p>
              Ideal para reducir grasa corporal y mantener masa muscular.{" "}
              Rica en proteínas magras, vegetales y grasas saludables.
            </p>
            <button>Ver más</button>
          </div>

          <div className="dieta-card">
            <img src="/img/dieta_volumen.jpg" alt="Dieta de volumen" />
            <h2>Dieta de Volumen</h2>
            <p>
              Diseñada para ganar masa muscular de forma limpia.{" "}
              Incluye carbohidratos complejos y alimentos ricos en nutrientes.
            </p>
            <button>Ver más</button>
          </div>

          <div className="dieta-card">
            <img src="/img/dieta_equilibrada.jpg" alt="Dieta equilibrada" />
            <h2>Dieta Equilibrada</h2>
            <p>
              Perfecta para mantenerte saludable y con energía.{" "}
              Balance ideal entre proteínas, carbohidratos y grasas.
            </p>
            <button>Ver más</button>
          </div>
        </section>
      </main>

      <footer>
        <p>© 2025 FitConnet. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Dietas;
