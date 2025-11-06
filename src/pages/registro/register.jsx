import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../html_css_js_FitConnet/registro/register.css';

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
    rol: "usuario",
  });
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [rol, setRol] = useState('usuario');

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
        let msg = "No se pudo registrar el usuario";
        try {
          const data = await response.json();
          if (data?.message) msg = data.message;
        } catch (_) {}
        throw new Error(msg);
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
        rol: "usuario",
      });
      navigate("/login");
    } catch (err) {
      setError(err.message);
      console.error("Error en registro:", err);
    }
  };

  return (
    <div className="register-container">
      {/* Columna izquierda: formulario */}
      <div className="form-section">
        {/* Logo y nombre */}
        <div className="logo">
          <img src="/img/logo.png" alt="Logo Fitconnet" />
          <h1>Fitconnet</h1>
        </div>

        {/* Formulario */}
        <div className="form-box">
          <h2><i>Crear Cuenta</i></h2>

          <form onSubmit={handleSubmit} className="register-form">
            <label htmlFor="nombre">Usuario</label>
            <input type="text" id="nombre" name="nombre" value={form.nombre} onChange={handleChange} required />

            <label htmlFor="contrasena">Contraseña</label>
            <input type="password" id="contrasena" name="contrasena" value={form.contrasena} onChange={handleChange} required />

            <label htmlFor="correo">Correo</label>
            <input type="email" id="correo" name="correo" value={form.correo} onChange={handleChange} required />

            <label htmlFor="rol">Rol</label>
            <select id="rol" value={rol} onChange={(e) => setRol(e.target.value)}>
              <option value="usuario">Usuario</option>
              <option value="admin">Administrador</option>
            </select>

            <div className="form-row">
              <div style={{ width: "48%" }}>
                <label htmlFor="edad">Edad</label>
                <input type="number" id="edad" name="edad" value={form.edad} onChange={handleChange} />
              </div>
              <div style={{ width: "48%" }}>
                <label htmlFor="genero">Género</label>
                <select id="genero" name="genero" value={form.genero} onChange={handleChange}>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div style={{ width: "48%" }}>
                <label htmlFor="peso">Peso (kg)</label>
                <input type="number" id="peso" name="peso" value={form.peso} onChange={handleChange} />
              </div>
              <div style={{ width: "48%" }}>
                <label htmlFor="altura">Altura (cm)</label>
                <input type="number" id="altura" name="altura" value={form.altura} onChange={handleChange} />
              </div>
            </div>

            <button id="submitBtn" type="submit">Crear cuenta</button>
            {error && <p className="error">{error}</p>}
            {exito && <p className="exito">{exito}</p>}
          </form>

          {/* Botón Facebook */}
          <button className="facebook-btn">
            <img src="/img/facebook.png" alt="Facebook" />
            Registrarse con Facebook
          </button>
        </div>
      </div>

      {/* Columna derecha: imagen */}
      <div className="image-section"></div>
    </div>
  );
}