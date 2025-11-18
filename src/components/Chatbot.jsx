import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Chatbot({ open, onClose }) {
  const navigate = useNavigate();
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

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const localFallback = (text) => {
    const t = text.toLowerCase();
    if (t.includes("plan") || t.includes("precio") || t.includes("comprar")) {
      return "Tenemos Plan 1 ($50k), Plan 2 ($275k), Plan 3 ($580k). Puedes verlos en 'Nuestros Planes' y comprar en Compras.";
    }
    if (t.includes("horario") || t.includes("hora")) {
      return "Abrimos L-V 6:00–22:00, fines de semana 8:00–18:00.";
    }
    if (t.includes("dieta") || t.includes("aliment")) {
      return "Ofrecemos dietas personalizadas en la sección Dietas (definición, volumen, equilibrada). ¿Qué objetivo buscas?";
    }
    if (t.includes("ejercicio") || t.includes("rutina") || t.includes("gimnasio") || t.includes("calistenia") || t.includes("casa")) {
      return "Tenemos rutinas para casa, gym y calistenia. Entra a 'Nuestros Servicios' para ver más.";
    }
    if (t.includes("contacto") || t.includes("correo") || t.includes("tel")) {
      return "Puedes escribir a contacto@fitconett.com o llamar +123 456 7890. También hay tarjetas en la sección Contacto.";
    }
    if (t.includes("publicacion") || t.includes("feed")) {
      return "La sección Publicaciones permite crear, ver, comentar y dar like a posts.";
    }
    if (t.includes("perfil") || t.includes("cuenta")) {
      return "Gestiona tu perfil en la sección Perfil. Puedes editar datos personales y ajustes.";
    }
    return "Puedo ayudarte con planes, horarios, dietas, ejercicios, publicaciones, compras o contacto. ¿Qué necesitas?";
  };

  const smartReply = async (text) => {
    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: messages.map(m => ({ role: m.from === 'me' ? 'user' : 'assistant', content: m.text })) }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      return data; // { reply, suggestions, sources }
    } catch (err) {
      console.warn('Chat backend no disponible, usando fallback local:', err?.message || err);
      return { reply: localFallback(text), suggestions: undefined };
    }
  };

  const send = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: "me", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    const data = await smartReply(userMsg.text);
    const botMsg = { from: "bot", text: data.reply, suggestions: data.suggestions };
    setMessages((prev) => [...prev, botMsg]);
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
              {m.from === 'bot' && Array.isArray(m.suggestions) && m.suggestions.length > 0 && (
                <div className="chat-pill-group">
                  {m.suggestions.map((s, idx) => (
                    <button key={idx} className="chat-pill" onClick={() => navigate(s.route)}>
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
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