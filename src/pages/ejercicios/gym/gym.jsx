import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./gym.css";

export default function Gym() {
  const navigate = useNavigate();
  const [ejercicios, setEjercicios] = useState([]);
  const [nuevo, setNuevo] = useState({
    nombre: "",
    musculo: "",
    series: "",
    repeticiones: "",
    imagen: "",
  });

  // 🔹 Cargar ejercicios desde localStorage al iniciar
  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("ejerciciosGym")) || [];
    setEjercicios(guardados);
  }, []);

  // 🔹 Guardar cambios en localStorage cuando se actualicen los ejercicios
  useEffect(() => {
    localStorage.setItem("ejerciciosGym", JSON.stringify(ejercicios));
  }, [ejercicios]);

  // 🔹 Manejar cambio de inputs
  const handleChange = (e) => {
    setNuevo({ ...nuevo, [e.target.id]: e.target.value });
  };

  // 🔹 Agregar ejercicio
  const agregarEjercicio = (e) => {
    e.preventDefault();
    if (!nuevo.nombre || !nuevo.musculo || !nuevo.series || !nuevo.repeticiones) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    const nuevoEjercicio = {
      nombre: nuevo.nombre,
      musculo: nuevo.musculo,
      series: nuevo.series,
      repeticiones: nuevo.repeticiones,
      imagen: nuevo.imagen || "../../img/default-gym.jpg",
    };

    setEjercicios([...ejercicios, nuevoEjercicio]);
    setNuevo({ nombre: "", musculo: "", series: "", repeticiones: "", imagen: "" });
  };

  // 🔹 Eliminar ejercicio
  const eliminarEjercicio = (nombre) => {
    const filtrados = ejercicios.filter((e) => e.nombre !== nombre);
    setEjercicios(filtrados);
  };

  return (
    <div>
      {/* 🔹 NAVBAR */}
      <header className="navbar">
        <div className="logo">
          <img src="../../img/logo-fitconnet.png" alt="FitConnet Logo" />
          <span>FitConnet</span>
        </div>
        <nav>
          <ul>
            <li>
              <button onClick={() => navigate("/")}>Inicio</button>
            </li>
            <li>
              <button onClick={() => navigate("/ejercicios/gym")}>Rutinas</button>
            </li>
            <li>
              <button onClick={() => navigate("/ejercicios/dietas")}>Dietas</button>
            </li>
            <li>
              <button>Contacto</button>
            </li>
          </ul>
        </nav>
      </header>

      {/* 🔹 CONTENIDO PRINCIPAL */}
      <main>
        <section className="intro">
          <h1>Ejercicios de Gimnasio</h1>
          <p>
            Explora, crea y administra tus ejercicios personalizados para mejorar tu rendimiento físico. 💪
          </p>
        </section>

        {/* 🔹 FORMULARIO */}
        <section className="form-section">
          <h2>Agregar un Nuevo Ejercicio</h2>
          <form id="form-ejercicio" onSubmit={agregarEjercicio}>
            <input
              type="text"
              id="nombre"
              placeholder="Nombre del ejercicio"
              value={nuevo.nombre}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              id="musculo"
              placeholder="Grupo muscular (Ej: Pecho, Espalda, Piernas)"
              value={nuevo.musculo}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              id="series"
              placeholder="Series"
              min="1"
              value={nuevo.series}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              id="repeticiones"
              placeholder="Repeticiones"
              min="1"
              value={nuevo.repeticiones}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              id="imagen"
              placeholder="URL de imagen (opcional)"
              value={nuevo.imagen}
              onChange={handleChange}
            />
            <button type="submit">Agregar Ejercicio</button>
          </form>
        </section>

        {/* 🔹 LISTA DE EJERCICIOS */}
        <section className="lista-ejercicios">
          <h2>Mis Ejercicios</h2>
          <div id="contenedor-ejercicios">
            {ejercicios.length === 0 ? (
              <p className="sin-ejercicios">Aún no has agregado ejercicios.</p>
            ) : (
              ejercicios.map((e, index) => (
                <div className="card" key={index}>
                  <img src={e.imagen} alt={e.nombre} />
                  <h3>{e.nombre}</h3>
                  <p>
                    <strong>Músculo:</strong> {e.musculo}
                  </p>
                  <p>
                    <strong>Series:</strong> {e.series} |{" "}
                    <strong>Reps:</strong> {e.repeticiones}
                  </p>
                  <button
                    className="delete-btn"
                    onClick={() => eliminarEjercicio(e.nombre)}
                  >
                    Eliminar
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* 🔹 FOOTER */}
      <footer>
        <p>© 2025 FitConnet | Todos los derechos reservados</p>
      </footer>
    </div>
  );
}
