import React, { useState } from "react";
import "./compras.css";

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
    <div className="compras-page" style={{
      width: "100vw", 
      height: "100vh", 
      display: "flex",
      margin: 0,
      padding: 0,
      overflow: "hidden"
    }}>
      {/* Panel Izquierdo */}
      <div className="left-panel" style={{
        width: "60%",
        height: "100%",
        backgroundColor: "#f0f0f0"
      }}>
        <img 
          src="/img/Gestion_user.jpg" 
          alt="Persona corriendo" 
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />
      </div>

      {/* Panel Derecho */}
      <div className="right-panel" style={{
        width: "40%",
        height: "100%",
        backgroundColor: "#333333",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white"
      }}>
        <div className="logo" style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "15px"
        }}>
          <img 
            src="/img/logo.png" 
            alt="Logo Fitconnet" 
            style={{
              width: "70px",
              borderRadius: "5px"
            }}
          />
          <h1 style={{fontSize: "2rem", fontWeight: "bold"}}>Fitconnet</h1>
        </div>

        <div className="form-box" style={{
          backgroundColor: "white",
          color: "black",
          padding: "25px 20px",
          borderRadius: "5px",
          width: "100%",
          maxWidth: "350px",
          textAlign: "center"
        }}>
          <h2 style={{
            backgroundColor: "purple",
            color: "white",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "20px"
          }}>
            <em>Comprar</em>
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="input-box" style={{
              backgroundColor: "black",
              color: "white",
              padding: "10px",
              borderRadius: "10px",
              marginBottom: "15px",
              textAlign: "left"
            }}>
              <label htmlFor="plan" style={{display: "block", marginBottom: "5px"}}>
                <strong>Elige tu plan:</strong>
              </label>
              <select
                id="plan"
                name="plan"
                value={formData.plan}
                onChange={handleChange}
                style={{width: "100%", padding: "8px"}}
              >
                <option value="basico">Plan 1</option>
                <option value="intermedio">Plan 2</option>
                <option value="premium">Plan 3</option>
              </select>
            </div>

            <div className="input-box" style={{
              backgroundColor: "black",
              color: "white",
              padding: "10px",
              borderRadius: "10px",
              marginBottom: "15px",
              textAlign: "left"
            }}>
              <label htmlFor="fecha" style={{display: "block", marginBottom: "5px"}}>
                <strong>Fecha de Inicio:</strong>
              </label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                style={{width: "100%", padding: "8px"}}
              />
            </div>

            <div className="input-box" style={{
              backgroundColor: "black",
              color: "white",
              padding: "10px",
              borderRadius: "10px",
              marginBottom: "15px",
              textAlign: "left"
            }}>
              <label htmlFor="correo" style={{display: "block", marginBottom: "5px"}}>
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
                style={{width: "100%", padding: "8px"}}
              />
            </div>

            <button 
              type="submit" 
              className="btn"
              style={{
                backgroundColor: "purple",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                width: "100%"
              }}
            >
              Comprar
            </button>
          </form>
            <p className="footer" style={{marginTop: "15px"}}>
              Pagas con: <strong>(COP)</strong>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Compras;
