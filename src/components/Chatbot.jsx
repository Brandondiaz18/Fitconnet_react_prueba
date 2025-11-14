import React, { useEffect, useRef, useState } from "react";

export default function Chatbot({ open, onClose }) {
  const [messages, setMessages] = useState([
    { from: "bot", text: "¡Hola! Soy tu asistente FitConnet. ¿En qué te ayudo?" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  if (!open) return null;

  const reply = (text) => {
    const t = text.toLowerCase();
    if (t.includes("plan") || t.includes("precio") || t.includes("comprar")) {
      return "Tenemos Plan 1 ($50k), Plan 2 ($275k), Plan 3 ($580k). Puedes verlos en 'Nuestros Planes' y comprar en Compras.";
    }
    if (t.includes("horario") || t.includes("hora")) {
      return "Abrimos L-V 6:00–22:00, fines de semana 8:00–18:00.";
    }
    if (t.includes("dieta") || t.includes("aliment")) {
      return "Ofrecemos dietas personalizadas en la sección Dietas. ¿Buscas definición, volumen o mantenimiento?";
    }
    if (t.includes("ejercicio") || t.includes("rutina")) {
      return "Tenemos rutinas para casa, gym y calistenia. Entra a 'Nuestros Servicios' para ver más.";
    }
    if (t.includes("contacto") || t.includes("correo") || t.includes("tel")) {
      return "Puedes escribir a contacto@fitconett.com o llamar +123 456 7890. También hay tarjetas en la sección Contacto.";
    }
    return "Puedo ayudarte con planes, horarios, dietas, ejercicios o contacto. ¿Qué necesitas?";
  };

  const send = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: "me", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    const botMsg = { from: "bot", text: reply(userMsg.text) };
    setTimeout(() => setMessages((prev) => [...prev, botMsg]), 400);
  };

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
      <div style={{
        width: 320,
        height: 420,
        display: "flex",
        flexDirection: "column",
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-md)",
        overflow: "hidden",
      }}>
        <div style={{
          background: "var(--color-primary)",
          color: "var(--color-primary-contrast)",
          padding: "8px 12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <strong>Chat FitConnet</strong>
          <button onClick={onClose} style={{
            background: "transparent",
            color: "var(--color-primary-contrast)",
            border: "none",
            cursor: "pointer",
            fontSize: 18,
          }}>×</button>
        </div>

        <div style={{ flex: 1, padding: 12, overflowY: "auto", background: "var(--color-elevated)" }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              margin: "8px 0",
              display: "flex",
              justifyContent: m.from === "me" ? "flex-end" : "flex-start",
            }}>
              <div style={{
                maxWidth: 240,
                padding: "8px 10px",
                borderRadius: 12,
                background: m.from === "me" ? "var(--color-primary)" : "var(--color-surface)",
                color: m.from === "me" ? "var(--color-primary-contrast)" : "var(--color-text)",
                boxShadow: "var(--shadow-xs)",
                border: m.from === "me" ? "none" : "1px solid var(--color-border)",
              }}>{m.text}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={send} style={{ display: "flex", gap: 8, padding: 8, borderTop: "1px solid var(--color-border)" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje..."
            style={{ flex: 1, padding: "8px 10px", borderRadius: 8, border: "1px solid var(--color-border)", background: "var(--color-bg)", color: "var(--color-text)" }}
          />
          <button type="submit" style={{
            background: "var(--color-primary)", color: "var(--color-primary-contrast)", border: "none",
            padding: "8px 12px", borderRadius: 8
          }}>Enviar</button>
        </form>
      </div>
    </div>
  );
}