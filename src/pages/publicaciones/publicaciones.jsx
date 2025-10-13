import React from "react";
import "./publicaciones.css";

const Publicaciones = () => {
  return (
    <div>
      {/* HEADER */}
      <header>
        <div className="logo">
          <img src="/img/logo.png" alt="logo" />
          <h1>FitConnet</h1>
        </div>
        <h2>Publicaciones</h2>
        <div className="perfil">
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="perfil"
          />
          <button className="logout">⮐</button>
        </div>
      </header>

      {/* MAIN */}
      <main>
        <aside className="amigos">
          <h3>Amigos</h3>
          <ul>
            <li>
              <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="Paola" /> Paola
            </li>
            <li>
              <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="Miguel" /> Miguel
            </li>
            <li>
              <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="Santiago" /> Santiago
            </li>
            <li>
              <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="Ronaldo" /> Ronaldo
            </li>
            <li>
              <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="Ángel" /> Ángel
            </li>
            <li>
              <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="Jessica" /> Jessica
            </li>
          </ul>
        </aside>

        <section className="publicaciones">
          <button id="btn-nueva-publicacion" className="nueva-publicacion">
            ➕ Nueva publicación
          </button>

          {/* Ejemplo de publicación */}
          <article className="post">
            <h4>
              <a href="#">Santiago</a>
            </h4>
            <p>
              <em>
                No siempre vas a tener ganas de entrenar, pero cada vez que
                decides hacerlo, estás venciendo a tu versión más débil y
                construyendo a la más fuerte.
              </em>
            </p>
            <div className="acciones">
              <button className="like">♥️</button>
              <span className="contador-likes">0</span>
              <button>Comenta...</button>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default Publicaciones;
