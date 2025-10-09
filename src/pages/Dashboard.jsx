import React from "react";

export default function Dashboard() {
  const token = localStorage.getItem("token");

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Bienvenido a FitConnet 🏋️‍♂️</h1>
      {token ? (
        <p>Tu sesión está activa ✅</p>
      ) : (
        <p>No has iniciado sesión. <a href="/login">Ir a Login</a></p>
      )}
    </div>
  );
}
