import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./user.css";
import Chatbot from "../../../components/Chatbot.jsx";

export default function User() {
  const navigate = useNavigate();

  // Amigos en localStorage
  const [friends, setFriends] = useState(() => {
    try {
      const saved = localStorage.getItem("friends");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [newFriend, setNewFriend] = useState({ nombre: "", correo: "" });
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("friends", JSON.stringify(friends));
  }, [friends]);

  // Nombre para saludo
  const nombre = useMemo(() => {
    try {
      const perfilStr = localStorage.getItem("perfil");
      const nameLS = localStorage.getItem("nombre");
      const correoLS = localStorage.getItem("correo");
      let n = "";
      if (perfilStr) {
        const p = JSON.parse(perfilStr);
        n = p?.nombre || p?.username || p?.name || "";
      }
      if (!n && nameLS) n = nameLS;
      if (!n && correoLS) n = correoLS.split("@")[0];
      return n || "Usuario";
    } catch {
      return "Usuario";
    }
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const addFriend = (e) => {
    e.preventDefault();
    if (!newFriend.nombre.trim() || !newFriend.correo.trim()) return;
    setFriends([...friends, { ...newFriend }]);
    setNewFriend({ nombre: "", correo: "" });
  };

  return (
    <div>
      {/* Header */}
      <header className="section1">
        <div className="menu-container">
          <div className="menu-button">☰</div>
          <div className="menu-content">
            <a href="#" onClick={(e)=>{e.preventDefault(); scrollTo("planes");}}>Nuestros Planes</a>
            <a href="#" onClick={(e)=>{e.preventDefault(); scrollTo("servicios");}}>Nuestros Servicios</a>
            <a href="#" onClick={(e)=>{e.preventDefault(); scrollTo("contacto");}}>Contacto</a>
          </div>
        </div>

        <img src="/img/logo.png" className="logo" alt="Logo Gimnasio" />

        <div className="center-buttons">
          <button onClick={() => scrollTo("inicio")}>Inicio</button>
          <button onClick={() => scrollTo("planes")}>Nuestros Planes</button>
          <button onClick={() => scrollTo("servicios")}>Nuestros Servicios</button>
          <button onClick={() => scrollTo("contacto")}>Contacto</button>
        </div>

        <div className="right-buttons">
          <button id="chatIA" onClick={() => setChatOpen(true)}>Chat</button>
          <button id="perfil" onClick={() => navigate("/perfil")}>Perfil</button>
          <button id="cerrarSesion" onClick={() => navigate("/login")}>Cerrar Sesión</button>
        </div>
      </header>

      {/* Sección 2 */}
      <section className="section2" id="inicio">
        <br />
        <br />
        <br />
        <h1 style={{ textAlign: "center" }}>hola {nombre} bienvenido a FitConnet</h1>
        <br />
        <br />
        <img src="/img/Seccion2.png" alt="Gimnasio" />
      </section>

      {/* Sección 3 - Planes */}
      <section className="section3" id="planes">
        <h2>Nuestros Planes</h2>
        <div className="planes-container">
          <div className="plan">
            <img src="/img/plan_1.jpeg" alt="Plan 1" />
            <p>Plan 1 - 1 mes - $50.000</p>
            <button onClick={() => navigate("/compras")}>
              Comprar
            </button>
          </div>

          <div className="plan">
            <img src="/img/plan_2.jpeg" alt="Plan 2" />
            <p>Plan 2 - 6 meses - $275.000</p>
            <button onClick={() => navigate("/compras")}>
              Comprar
            </button>
          </div>

          <div className="plan">
            <img src="/img/plan_3.jpeg" alt="Plan 3" />
            <p>Plan 3 - 1 año - $580.000</p>
            <button onClick={() => navigate("/compras")}>
              Comprar
            </button>
          </div>
        </div>
      </section>

      {/* Sección 4 - Servicios */}
      <section className="section4" id="servicios">
        <h2>Nuestros Servicios</h2>
        <div className="carousel">
          <div>
            <img src="/img/casa.jpeg" alt="Ejercicio en casa" />
            <p>Ejercicios en casa</p>
            <button onClick={() => navigate("/ejercicios/casa")}>
              Ver más
            </button>
          </div>

          <div>
            <img src="/img/gym.jpeg" alt="Ejercicio en gym" />
            <p>Ejercicios en gimnasio</p>
            <button onClick={() => navigate("/ejercicios/gym")}>
              Ver más
            </button>
          </div>

          <div>
            <img src="/img/calistenia.jpeg" alt="Calistenia" />
            <p>Calistenia</p>
            <button onClick={() => navigate("/ejercicios/calistenia")}>
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
          <form onSubmit={addFriend} style={{ width: "100%", marginBottom: 10 }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <input
                type="text"
                placeholder="Nombre"
                value={newFriend.nombre}
                onChange={(e) => setNewFriend({ ...newFriend, nombre: e.target.value })}
                style={{ flex: 1 }}
              />
              <input
                type="email"
                placeholder="Correo"
                value={newFriend.correo}
                onChange={(e) => setNewFriend({ ...newFriend, correo: e.target.value })}
                style={{ flex: 1 }}
              />
              <button type="submit">Agregar</button>
            </div>
          </form>

          {friends.length === 0 ? (
            <p style={{ color: "#aaa" }}>No tienes amigos aún.</p>
          ) : (
            friends.map((amigo, idx) => (
              <div className="friend" key={`${amigo.correo}-${idx}`}>
                <img src="/img/perfil.png" alt="" />
                <a href="#">{amigo.nombre} — {amigo.correo}</a>
              </div>
            ))
          )}
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

      {/* Sección 6: Dietas y Ejercicios */}
      <section className="section6" id="section6">
        <h2>Explora más</h2>
        <div className="planes-container">
          <div className="plan">
            <img src="/img/Reportes.jpg" alt="Dietas" />
            <p>Dietas personalizadas</p>
            <button onClick={() => navigate("/dietas")}>
              Ir a Dietas
            </button>
          </div>

          <div className="plan">
            <img src="/img/Gestion_user.jpg" alt="Ejercicios" />
            <p>Ejercicios para todos</p>
            <button onClick={() => navigate("/ejercicios/gym")}>
              Ir a Ejercicios
            </button>
          </div>
        </div>
      </section>

      {/* Sección 7: Contacto (dos personas) */}
      <section className="section7" id="contacto">
        <h2>Contacto</h2>
        <div className="planes-container">
          <div className="plan">
            <img src="/img/perfil.png" alt="Contacto 1" />
            <p><strong>Allan Castillo</strong></p>
            <p>allancastillosena2703@gmail.com</p>
            <p>3045232524</p>
          </div>
          <div className="plan">
            <img src="/img/perfil.png" alt="Contacto 2" />
            <p><strong>Brandon Diaz</strong></p>
            <p>brandondiaz.sena@gmail.com</p>
            <p>3118667935</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section8">
        <img src="/img/logo.png" className="footer-logo" alt="Logo del pie de página" />
        <div className="footer-text">
          <div className="schedule-box">
            <ul>
              <li><strong>Horarios de Atención:</strong></li>
              <li>Lunes a Viernes: 6:00 AM - 10:00 PM</li>
            </ul>
          </div>
        </div>
      </footer>
      {/* Chatbot */}
      <Chatbot open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
