import React, { useState } from "react";
import "./Registro.css";

export default function Registro() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    edad: "",
    peso: "",
    altura: "",
    genero: "M"
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
        genero: "M"
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="registro-container">
      <form className="registro-form" onSubmit={handleSubmit}>
        <h2>Registro</h2>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
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
        <input
          type="number"
          name="edad"
          placeholder="Edad"
          value={form.edad}
          onChange={handleChange}
        />
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
        <select
          name="genero"
          value={form.genero}
          onChange={handleChange}
        >
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
        <button type="submit">Registrarse</button>
        {error && <p className="error">{error}</p>}
        {exito && <p className="exito">{exito}</p>}
      </form>
    </div>
  );
}