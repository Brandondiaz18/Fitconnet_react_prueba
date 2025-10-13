import React, { useState } from "react";
import "../../styles/compras.css"; // Ajusta la ruta según tu estructura

const Compras = () => {
  const [formData, setFormData] = useState({
    plan: "basico",
    fecha: "",
    correo: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Compra realizada:", formData);
    alert(`✅ Plan ${formData.plan} comprado con éxito para ${formData.correo}`);
    setFormData({ plan: "basico", fecha: "", correo: "" });
  };

  return (
    <div className="container">
      {/* Panel Izquierdo */}
      <div className="left-panel">
        <img src="/img/Gestion_user.jpg" alt="Persona corriendo" />
      </div>

      {/* Panel Derecho */}
      <div className="right-panel">
        <div className="logo">
          <img src="/img/logo.png" alt="Logo Fitconnet" />
          <h1>Fitconnet</h1>
        </div>

        <div className="form-box">
          <h2>
            <em>Comprar</em>
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <label htmlFor="plan">
                <strong>Elige tu plan:</strong>
              </label>
              <select
                id="plan"
                name="plan"
                value={formData.plan}
                onChange={handleChange}
              >
                <option value="basico">Plan 1</option>
                <option value="intermedio">Plan 2</option>
                <option value="premium">Plan 3</option>
              </select>
            </div>

            <div className="input-box">
              <label htmlFor="fecha">
                <strong>Fecha de Inicio:</strong>
              </label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
              />
            </div>

            <div className="input-box">
              <label htmlFor="correo">
                <strong>Correo:</strong>
              </label>
              <input
                type="email"
                id="correo"
                name="correo"
                placeholder="example@email.com"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn">
              Comprar
            </button>
          </form>
          <p className="footer">
            Pagas con: <strong>(COP)</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Compras;
