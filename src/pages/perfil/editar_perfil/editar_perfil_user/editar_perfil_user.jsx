import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./editar_perfil_user.css";

const EditarPerfil = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    gender: "otro",
    weight: "",
    height: "",
    age: "",
    sleep: "",
    water: "",
    email: "",
    streak: 0,
    reps: 0,
    achievements: 0,
    hours: 0,
    goals: "",
    notes: "",
  });

  const [profileImg, setProfileImg] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [verifyError, setVerifyError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImg(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const calcularIMC = () => {
    const alturaMetros = formData.height / 100;
    const imc = formData.weight / (alturaMetros * alturaMetros);
    return imc.toFixed(2);
  };

  const categoriaIMC = () => {
    const imc = calcularIMC();
    if (imc < 18.5) return "Bajo peso";
    if (imc < 25) return "Peso Normal";
    if (imc < 30) return "Sobrepeso";
    return "Obesidad";
  };

  const verifyPassword = async () => {
    setVerifyError("");
    const correo = localStorage.getItem("correo");
    if (!correo) {
      setVerifyError("No se encontró el correo del usuario.");
      return;
    }
    try {
      const resp = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasena: password }),
      });
      if (!resp.ok) throw new Error("Contraseña incorrecta");
      setIsVerified(true);
    } catch (err) {
      setVerifyError(err.message || "Contraseña incorrecta");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Guardar cambios en backend con token
    const token = localStorage.getItem("token");
    const correo = localStorage.getItem("correo");
    const payload = { correo, ...formData };

    const endpoints = [
      { url: "http://localhost:8000/api/usuarios/me", method: "PUT", auth: true },
      { url: "http://localhost:8000/api/usuarios/", method: "PUT", auth: true },
      { url: "http://localhost:8000/api/usuarios/update", method: "PUT", auth: true },
    ];

    let saved = false;
    for (const ep of endpoints) {
      try {
        const resp = await fetch(ep.url, {
          method: ep.method,
          headers: {
            "Content-Type": "application/json",
            ...(ep.auth && token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        });
        if (resp.ok) {
          saved = true;
          break;
        }
      } catch (err) {
        // intentar siguiente endpoint
      }
    }

    // Fallback local si la API no responde
    if (!saved) {
      localStorage.setItem("perfil", JSON.stringify(payload));
    }

    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    console.log("Datos guardados:", payload);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>✏️ Editar Perfil</h1>
        <button className="btn-back" onClick={() => window.history.back()}>
          ← Volver
        </button>
      </div>

      {success && (
        <div id="successMessage" className="success-message">
          <span>✓</span>
          <span>Perfil actualizado exitosamente</span>
        </div>
      )}

      {!isVerified && (
        <div className="verify-overlay">
          <div className="verify-modal">
            <h3>Verifica tu contraseña</h3>
            <p>Para editar tu perfil, ingresa tu contraseña.</p>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", marginTop: 10, padding: 12, background: "#3a3a3a", border: "2px solid #4a4a4a", color: "#fff", borderRadius: 10 }}
            />
            {verifyError && <div className="verify-error">{verifyError}</div>}
            <div className="verify-actions">
              <button className="btn-cancel" onClick={() => window.history.back()}>Cancelar</button>
              <button className="btn-save" type="button" onClick={async () => { await verifyPassword(); }}>Verificar</button>
            </div>
          </div>
        </div>
      )}

      <form id="editProfileForm" onSubmit={handleSubmit}>
        <div className="profile-section">
          <div className="profile-photo">
            <div className="photo-container">
              {profileImg ? (
                <img id="profileImg" src={profileImg} alt="Foto de perfil" />
              ) : (
                <div id="photoPlaceholder" className="photo-placeholder">
                  👤
                </div>
              )}
            </div>
            <input
              type="file"
              id="photoInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handlePhotoChange}
            />
            <button
              type="button"
              className="btn-change-photo"
              onClick={() => document.getElementById("photoInput").click()}
            >
              📷 Cambiar Foto
            </button>
            <div className="verified-badge">✓ Verificado</div>
          </div>

          <div className="form-section">
            <h2 className="section-title">👤 Datos Personales</h2>
            <div className="form-grid">
              {[
                { id: "username", label: "Nombre de Usuario", type: "text" },
                { id: "gender", label: "Género", type: "select" },
                { id: "weight", label: "Peso (kg)", type: "number" },
                { id: "height", label: "Altura (cm)", type: "number" },
                { id: "age", label: "Edad", type: "number" },
                { id: "sleep", label: "Horas de Dormir", type: "number" },
                { id: "water", label: "Vasos de Agua al Día", type: "number" },
                { id: "email", label: "Email", type: "email" },
              ].map((item) => (
                <div className="form-group" key={item.id}>
                  <label>{item.label}</label>
                  {item.type === "select" ? (
                    <select
                      id="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="masculino">Masculino</option>
                      <option value="femenino">Femenino</option>
                      <option value="otro">Otro</option>
                    </select>
                  ) : (
                    <input
                      type={item.type}
                      id={item.id}
                      value={formData[item.id]}
                      onChange={handleChange}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">🏋️ Estadísticas de Entrenamiento</h2>
          <div className="stats-grid">
            {[
              { icon: "🔥", label: "Racha de días", value: formData.streak },
              { icon: "🔁", label: "Repeticiones", value: formData.reps },
              { icon: "🎯", label: "Logros alcanzados", value: formData.achievements },
              { icon: "⏱️", label: "Horas de práctica", value: `${formData.hours}h` },
            ].map((stat, i) => (
              <div className="stat-card" key={i}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-info">
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="form-grid" style={{ marginTop: 20 }}>
            {[
              { id: "streak", label: "Editar Racha" },
              { id: "reps", label: "Editar Repeticiones" },
              { id: "achievements", label: "Editar Logros" },
              { id: "hours", label: "Editar Horas (minutos)" },
            ].map((item) => (
              <div className="form-group" key={item.id}>
                <label>{item.label}</label>
                <input
                  type="number"
                  id={item.id}
                  value={formData[item.id]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">📊 Índice de Masa Corporal (IMC)</h2>
          <div className="imc-section">
            <div className="imc-display">
              <div className="imc-value">{calcularIMC()}</div>
              <div className="imc-label">Tu IMC actual</div>
              <div
                className="imc-label"
                style={{ color: "#7c3aed", fontSize: "16px", marginTop: "10px" }}
              >
                {categoriaIMC()}
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">📝 Información Adicional</h2>
          <div className="form-group full-width">
            <label>Objetivos</label>
            <textarea
              id="goals"
              value={formData.goals}
              onChange={handleChange}
              placeholder="Describe tus objetivos de fitness..."
            ></textarea>
          </div>
          <div className="form-group full-width">
            <label>Notas</label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Notas adicionales..."
            ></textarea>
          </div>
        </div>

        <div className="actions">
          <button
            type="button"
            className="btn-cancel"
            onClick={() => window.history.back()}
          >
            Cancelar
          </button>
          <button type="submit" className="btn-save">
            💾 Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
  useEffect(() => {
    const token = localStorage.getItem("token");
    const correoLS = localStorage.getItem("correo");
    (async () => {
      try {
        let data = null;
        if (token) {
          const resp = await fetch("http://localhost:8000/api/usuarios/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (resp.ok) data = await resp.json();
        }
        if (!data && correoLS) {
          const respByEmail = await fetch(
            `http://localhost:8000/api/usuarios/by-email?correo=${encodeURIComponent(correoLS)}`
          );
          if (respByEmail.ok) data = await respByEmail.json();
        }
        if (!data) {
          const local = localStorage.getItem("perfil");
          if (local) data = JSON.parse(local);
        }
        if (!data) return;

        const mapGenero = (g) => {
          if (!g) return "otro";
          const s = String(g).toLowerCase();
          if (s === "m" || s.startsWith("masc")) return "masculino";
          if (s === "f" || s.startsWith("fem")) return "femenino";
          return "otro";
        };
        setFormData((prev) => ({
          ...prev,
          username: data?.nombre || prev.username || "",
          email: data?.correo || prev.email || "",
          gender: mapGenero(data?.genero),
          weight: data?.peso ?? prev.weight ?? "",
          height: data?.altura ?? prev.height ?? "",
          age: data?.edad ?? prev.age ?? "",
          sleep: data?.horas_dormir ?? prev.sleep ?? "",
          water: data?.vasos_agua ?? prev.water ?? "",
        }));
      } catch (err) {
        // silent fallback
      }
    })();
  }, []);
};

export default EditarPerfil;
