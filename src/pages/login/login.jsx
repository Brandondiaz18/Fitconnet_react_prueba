import React, { useState } from "react";
import "./Login.css";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasena }),
      });
      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }
      const data = await response.json();
      // Guarda el token en localStorage
      localStorage.setItem("token", data.access_token);
      // Redirige al dashboard o página principal
      window.location.href = "/principal";
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>
        <input
          type="text"
          placeholder="Correo"
          value={correo}
          onChange={e => setCorreo(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={e => setContrasena(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}