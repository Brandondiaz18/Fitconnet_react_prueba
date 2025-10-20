import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./casa.css";

export default function Casa() {
  const navigate = useNavigate();
  const [ejercicios, setEjercicios] = useState([
    {
      nombre: "Flexiones",
      descripcion: "Fortalece pecho, hombros y brazos. Ideal para principiantes.",
      imagen: "https://cdn.pixabay.com/photo/2016/11/19/14/00/sport-1834661_1280.jpg",
    },
    {
      nombre: "Plancha",
      descripcion: "Ejercicio isométrico para fortalecer el abdomen y la espalda baja.",
      imagen: "https://cdn.pixabay.com/photo/2016/03/27/22/16/yoga-1284657_1280.jpg",
    },
    {
      nombre: "Sentadillas",
      descripcion: "Trabaja glúteos, piernas y mejora la postura corporal.",
      imagen: "https://cdn.pixabay.com/photo/2017/08/02/00/44/fitness-2568880_1280.jpg",
    },
  ]);

  const [nuevo, setNuevo] = useState({
    nombre: "",
    descripcion: "",
    imagen: "",
  });

  const handleChange = (e) => {
    setNuevo({ ...nuevo, [e.target.id]: e.target.value });
  };

  const agregarEjercicio = (e) => {
    e.preventDefault();
    if (nuevo.nombre && nuevo.descripcion) {
      setEjercicios([
        ...ejercicios,
        {
          nombre: nuevo.nombre,
          descripcion: nuevo.descripcion,
          imagen:
            nuevo.imagen ||
            "https://cdn-icons-png.flaticon.com/512/1041/1041882.png",
        },
      ]);
      setNuevo({ nombre: "", descripcion: "", imagen: "" });
    } else {
      alert("Por favor completa los campos requeridos.");
    }
  };

  return (
    <div>
      {/* 🔹 NAVBAR */}
      <header className="navbar">
        <div className="logo">
          <img src="/img/logo.png" alt="Logo FitConnet" />
          <span>FitConnet</span>
        </div>

        <div className="nav-links">
          <a
            href="/"
            className="active"
            onClick={(e) => { e.preventDefault(); navigate("/"); }}
          >
            Inicio
          </a>
          <a
            href="/ejercicios/gym"
            onClick={(e) => { e.preventDefault(); navigate("/ejercicios/gym"); }}
          >
            Gimnasio
          </a>
          <a
            href="/ejercicios/calistenia"
            onClick={(e) => { e.preventDefault(); navigate("/ejercicios/calistenia"); }}
          >
            Calistenia
          </a>
          <a href="#contacto">Contacto</a>
        </div>
      </header>

      {/* 🔹 CONTENIDO PRINCIPAL */}
      <main className="container">
        {/* Sección de Ejercicios */}
        <section className="lista-ejercicios">
          <h2>Rutinas Caseras</h2>
          <div className="grid" id="contenedor-ejercicios">
            {ejercicios.map((ejer, index) => (
              <div className="ejercicio-card" key={index}>
                <img src={ejer.imagen} alt={ejer.nombre} />
                <h3>{ejer.nombre}</h3>
                <p>{ejer.descripcion}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sección de agregar nuevos ejercicios */}
        <section className="agregar-ejercicio">
          <h2>Agregar Nuevo Ejercicio</h2>
          <form id="form-ejercicio" onSubmit={agregarEjercicio}>
            <input
              type="text"
              id="nombre"
              placeholder="Nombre del ejercicio"
              value={nuevo.nombre}
              onChange={handleChange}
              required
            />
            <textarea
              id="descripcion"
              placeholder="Descripción del ejercicio"
              value={nuevo.descripcion}
              onChange={handleChange}
              required
            />
            <input
              type="url"
              id="imagen"
              placeholder="URL de imagen (opcional)"
              value={nuevo.imagen}
              onChange={handleChange}
            />
            <button type="submit">Agregar Ejercicio</button>
          </form>
        </section>
      </main>
    </div>
  );
}
