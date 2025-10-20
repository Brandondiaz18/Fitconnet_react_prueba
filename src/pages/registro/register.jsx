import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registro.css";

export default function Registro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    edad: "",
    peso: "",
    altura: "",
    genero: "M",
  });
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");
    try {
      const response = await fetch("http://localhost:8000/api/usuarios/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error("No se pudo registrar el usuario");
      }
      setExito("¡Registro exitoso! Ahora puedes iniciar sesión.");
      setForm({
        nombre: "",
        correo: "",
        contrasena: "",
        edad: "",
        peso: "",
        altura: "",
        genero: "M",
      });
      // Enlazar al login para continuar
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      {/* Panel Izquierdo: formulario y logo */}
      <div className="left-panel">
        <div className="logo">
          <img src="/img/logo.png" alt="Logo Fitconnet" />
          <h1>Fitconnet</h1>
        </div>

        <form className="form-box" onSubmit={handleSubmit}>
          <h2><i>Crear Cuenta</i></h2>

          <input
            type="text"
            name="nombre"
            placeholder="Nombre usuario"
            value={form.nombre}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="correo"
            placeholder="Correo"
            value={form.correo}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="contrasena"
            placeholder="Contraseña"
            value={form.contrasena}
            onChange={handleChange}
            required
          />

          <div className="form-row">
            <input
              type="number"
              name="edad"
              placeholder="Edad"
              value={form.edad}
              onChange={handleChange}
            />
            <select name="genero" value={form.genero} onChange={handleChange}>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div className="form-row">
            <input
              type="number"
              name="peso"
              placeholder="Peso (kg)"
              value={form.peso}
              onChange={handleChange}
            />
            <input
              type="number"
              name="altura"
              placeholder="Altura (cm)"
              value={form.altura}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Crear</button>
          {error && <p className="error">{error}</p>}
          {exito && <p className="exito">{exito}</p>}

          <p className="facebook-text">Iniciar sesión con Facebook</p>
          <button type="button" className="facebook-btn">
            <img src="/img/facebook.png" alt="Facebook" /> Facebook
          </button>
        </form>
      </div>

      {/* Panel Derecho: imagen */}
      <div className="right-panel">
        <img src="/img/gym.jpeg" alt="Gimnasio" />
      </div>
    </div>
  );
}