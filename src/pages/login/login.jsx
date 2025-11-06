import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
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
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("correo", correo);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="left">
        <img src="/img/gym.jpeg" alt="Gimnasio" />
      </div>

      <div className="right">
        <div className="logo">
          <img src="/img/logo.png" alt="Logo Fitconnet" />
          <h1>Fitconnet</h1>
        </div>

        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label>Usuario:</label>
            <input
              type="text"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />

            <label>Contraseña:</label>
            <input
              type="password"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />

            <button type="submit" className="btn">iniciar Sesion</button>
            {error && <p className="error">{error}</p>}
          </form>

          <div className="extra-links">
            <Link to="/register">Crear cuenta</Link>
          </div>
        </div>
      </div>
    </div>
  );
}