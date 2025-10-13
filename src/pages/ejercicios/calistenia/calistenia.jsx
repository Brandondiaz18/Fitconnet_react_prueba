import React, { useState } from "react";
import "./calistenia.css";

export default function Calistenia() {
  const [exercises, setExercises] = useState([
    {
      nombre: "Flexiones",
      descripcion:
        "Fortalece pecho, hombros y tríceps con este clásico del entrenamiento corporal.",
      imagen:
        "https://cdn.pixabay.com/photo/2016/03/27/19/31/man-1282232_1280.jpg",
    },
    {
      nombre: "Dominadas",
      descripcion:
        "Trabaja la espalda y los bíceps mejorando tu fuerza y control.",
      imagen:
        "https://cdn.pixabay.com/photo/2016/11/19/14/00/fitness-1835736_1280.jpg",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [nuevo, setNuevo] = useState({
    nombre: "",
    descripcion: "",
    imagen: "",
  });

  const handleChange = (e) => {
    setNuevo({ ...nuevo, [e.target.id]: e.target.value });
  };

  const agregarEjercicio = () => {
    if (nuevo.nombre && nuevo.descripcion && nuevo.imagen) {
      setExercises([...exercises, nuevo]);
      setNuevo({ nombre: "", descripcion: "", imagen: "" });
      setShowModal(false);
    } else {
      alert("Por favor completa todos los campos.");
    }
  };

  return (
    <div>
      <header>
        <div className="logo">
          <img src="../../img/logo-fitconnet.png" alt="FitConnet Logo" />
          <span>FitConnet</span>
        </div>
        <nav>
          <ul>
            <li>
              <a href="../../principal/user/user.html">Inicio</a>
            </li>
            <li>
              <a href="../gym/gym.html">Gimnasio</a>
            </li>
            <li>
              <a href="../casa/casa.html">Casa</a>
            </li>
            <li>
              <a href="../calistenia/calistenia.html" className="activo">
                Calistenia
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="intro">
          <h1>Entrena con tu propio cuerpo</h1>
          <p>
            Descubre rutinas de calistenia que mejoran tu fuerza, coordinación y
            resistencia. Agrega tus ejercicios personalizados y progresa con tu
            propio peso corporal. 💪
          </p>
          <button
            id="addExerciseBtn"
            className="btn"
            onClick={() => setShowModal(true)}
          >
            Añadir Ejercicio
          </button>
        </section>

        <section className="lista-ejercicios" id="exerciseList">
          <h2>Mis Ejercicios de Calistenia</h2>

          {exercises.map((ejer, index) => (
            <div className="card" key={index}>
              <img src={ejer.imagen} alt={ejer.nombre} />
              <h3>{ejer.nombre}</h3>
              <p>{ejer.descripcion}</p>
            </div>
          ))}
        </section>
      </main>

      {showModal && (
        <div id="modal" className="modal">
          <div className="modal-content">
            <h2>Agregar Nuevo Ejercicio</h2>

            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              value={nuevo.nombre}
              onChange={handleChange}
              placeholder="Ej: Plancha lateral"
            />

            <label htmlFor="descripcion">Descripción:</label>
            <textarea
              id="descripcion"
              rows="3"
              value={nuevo.descripcion}
              onChange={handleChange}
              placeholder="Describe brevemente el ejercicio..."
            ></textarea>

            <label htmlFor="imagen">URL de imagen:</label>
            <input
              type="text"
              id="imagen"
              value={nuevo.imagen}
              onChange={handleChange}
              placeholder="Pega aquí una URL de imagen"
            />

            <div className="modal-buttons">
              <button id="guardarBtn" className="btn" onClick={agregarEjercicio}>
                Guardar
              </button>
              <button
                id="cerrarBtn"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <footer>
        <p>© 2025 FitConnet | Todos los derechos reservados</p>
      </footer>
    </div>
  );
}
