import React from "react";
import "./user.css";

export default function User() {
  return (
    <div>
      {/* Header */}
      <header className="section1">
        <div className="menu-container">
          <div className="menu-button">☰</div>
          <div className="menu-content">
            <a href="#">Nuestros Servicios</a>
            <a href="#">Aviones</a>
            <a href="#">Contacto</a>
          </div>
        </div>

        <img src="/img/logo.png" className="logo" alt="Logo Gimnasio" />

        <div className="center-buttons">
          <button>Inicio</button>
          <button>Nuestros Servicios</button>
          <button>Nuestros Planes</button>
          <button>Contacto</button>
        </div>

        <div className="right-buttons">
          <button id="chatIA">Chat</button>
          <button id="perfil">Perfil</button>
          <button id="cerrarSesion">Cerrar Sesión</button>
        </div>
      </header>

      {/* Sección 2 */}
      <section className="section2">
        <br />
        <br />
        <br />
        <h1>Bienvenido a FitConnet</h1>
        <br />
        <br />
        <img src="/img/Seccion2.png" alt="Gimnasio" />
      </section>

      {/* Sección 3 - Planes */}
      <section className="section3">
        <h2>Nuestros Planes</h2>
        <div className="planes-container">
          <div className="plan">
            <img src="/img/plan_1.jpeg" alt="Plan 1" />
            <p>Plan 1 - 1 mes - $50.000</p>
            <button onClick={() => (window.location.href = "/compras/compras.html")}>
              Comprar
            </button>
          </div>

          <div className="plan">
            <img src="/img/plan_2.jpeg" alt="Plan 2" />
            <p>Plan 2 - 6 meses - $275.000</p>
            <button onClick={() => (window.location.href = "/compras/compras.html")}>
              Comprar
            </button>
          </div>

          <div className="plan">
            <img src="/img/plan_3.jpeg" alt="Plan 3" />
            <p>Plan 3 - 1 año - $580.000</p>
            <button onClick={() => (window.location.href = "/compras/compras.html")}>
              Comprar
            </button>
          </div>
        </div>
      </section>

      {/* Sección 4 - Servicios */}
      <section className="section4">
        <h2>Nuestros Servicios</h2>
        <div className="carousel">
          <div>
            <img src="/img/casa.jpeg" alt="Ejercicio en casa" />
            <p>Ejercicios en casa</p>
            <button onClick={() => (window.location.href = "/ejercicios/casa/casa.html")}>
              Ver más
            </button>
          </div>

          <div>
            <img src="/img/gym.jpeg" alt="Ejercicio en gym" />
            <p>Ejercicios en gimnasio</p>
            <button onClick={() => (window.location.href = "/ejercicios/gym/gym.html")}>
              Ver más
            </button>
          </div>

          <div>
            <img src="/img/calistenia.jpeg" alt="Calistenia" />
            <p>Calistenia</p>
            <button onClick={() => (window.location.href = "/ejercicios/calistenia/calistenia.html")}>
              Ver más
            </button>
          </div>
        </div>
      </section>

      {/* Sección 5 - Publicaciones */}
      <section className="section5">
        {/* Panel izquierdo: Amigos */}
        <div className="friends-panel">
          <h2>Amigos</h2>
          {["Paola", "Miguel", "Santiago", "Ronaldo", "Angel", "Jessica"].map((nombre) => (
            <div className="friend" key={nombre}>
              <img src="/img/perfil.png" alt="" />
              <a href="#">{nombre}</a>
            </div>
          ))}
        </div>

        {/* Panel derecho: Publicaciones */}
        <div className="posts-panel">
          <div className="posts-header">
            <h1>Publicaciones</h1>
            <a href="#">Ver más +</a>
          </div>

          <div className="posts-grid">
            <div className="post-card">
              <h3>
                <img src="/img/perfil.png" alt="" /> Santiago
              </h3>
              <p>
                No siempre vas a tener ganas de entrenar, pero cada vez que decides hacerlo, estás venciendo a tu versión más débil y construyendo a la más fuerte.
              </p>
            </div>

            <div className="post-card">
              <h3>
                <img src="/img/perfil.png" alt="" /> Angel
              </h3>
              <p>
                No estás compitiendo contra nadie, estás luchando contra tus excusas, tus miedos y tus límites. Y cada vez que eliges entrenar, les estás ganando.
              </p>
            </div>

            <div className="post-card">
              <h3>
                <img src="/img/perfil.png" alt="" /> Miguel
              </h3>
              <img src="/img/frase.webp" alt="Cree en los milagros" />
              <p>
                Cree en los milagros, pero no dependas de ellos.
                <br />
                <em>— Immanuel Kant</em>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 6 */}
      <section className="section6">
        <p>Pronto App - Información aleatoria</p>
      </section>

      {/* Sección 7 */}
      <section className="section7">
        <h2>Contacto</h2>
        <div className="contact-info">
          <p>📧 Correo: contacto@fitconett.com</p>
          <p>📞 Teléfono: +123 456 7890</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="section8">
        <img src="/img/logo.png" className="footer-logo" alt="Logo del pie de página" />
        <div className="footer-text">
          <ul>
            <li><strong>Horarios de Atención:</strong></li>
            <li>Lunes a Viernes: 6:00 AM - 10:00 PM</li>
            <li>Sábados y Domingos: 8:00 AM - 6:00 PM</li>
          </ul>
          <ul>
            <li>© 2025 FitConett - Todos los derechos reservados.</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
