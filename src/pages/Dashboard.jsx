import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const token = localStorage.getItem("token");

  return (
    <div className="page">
      <div className="card" style={{ textAlign: "center", padding: "24px" }}>
        <h1>Bienvenido a FitConnet 🏋️‍♂️</h1>
        {token ? (
          <p>Tu sesión está activa ✅</p>
        ) : (
          <p>
            No has iniciado sesión. <Link to="/login" className="nav-link">Ir a Login</Link>
          </p>
        )}
      </div>
    </div>
  );
}
