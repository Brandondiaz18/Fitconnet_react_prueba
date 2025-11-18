import express from 'express';
import { KNOWLEDGE, retrieve, suggestActions } from '../data/knowledge.js';

const router = express.Router();

// Chat inteligente usando OpenAI (si está configurado)
async function callOpenAI(messages) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null; // sin clave -> usar fallback

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages,
        temperature: 0.2,
      }),
    });
    if (!res.ok) {
      console.error('OpenAI error', await res.text());
      return null;
    }
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content?.trim();
    return text || null;
  } catch (err) {
    console.error('Error llamando OpenAI:', err);
    return null;
  }
}

function localFallback(text) {
  const t = text.toLowerCase();
  if (t.includes('plan') || t.includes('precio') || t.includes('comprar')) {
    return 'Tenemos Plan 1 ($50k), Plan 2 ($275k), Plan 3 ($580k). Puedes verlos en "Nuestros Planes" y comprar en Compras.';
  }
  if (t.includes('horario') || t.includes('hora')) {
    return 'Abrimos L-V 6:00–22:00, fines de semana 8:00–18:00.';
  }
  if (t.includes('dieta') || t.includes('aliment')) {
    return 'Ofrecemos dietas personalizadas en la sección Dietas (definición, volumen, equilibrada). ¿Qué objetivo buscas?';
  }
  if (t.includes('ejercicio') || t.includes('rutina') || t.includes('gimnasio') || t.includes('calistenia') || t.includes('casa')) {
    return 'Tenemos rutinas para casa, gym y calistenia. Entra a "Nuestros Servicios" para ver más o usa las páginas dedicadas.';
  }
  if (t.includes('contacto') || t.includes('correo') || t.includes('tel')) {
    return 'Puedes escribir a contacto@fitconett.com o llamar +123 456 7890. También hay tarjetas en la sección Contacto.';
  }
  if (t.includes('publicacion') || t.includes('feed')) {
    return 'La sección Publicaciones permite crear, ver, comentar y dar like a posts.';
  }
  if (t.includes('perfil') || t.includes('cuenta')) {
    return 'Gestiona tu perfil en la sección Perfil. Puedes editar datos personales y ajustes.';
  }
  return 'Puedo ayudarte con planes, horarios, dietas, ejercicios, publicaciones, compras o contacto. ¿Qué necesitas?';
}

router.post('/', async (req, res) => {
  const { message, history } = req.body || {};
  const userText = String(message || '').trim();
  if (!userText) return res.status(400).json({ message: 'message requerido' });

  const related = retrieve(userText);
  const context = related.map(r => `- ${r.topic}: ${r.summary} (ruta: ${r.route})`).join('\n');
  const systemPrompt = `Eres el asistente de FitConnet, una plataforma de fitness con estos apartados: Nuestros Servicios (Casa, Gimnasio, Calistenia), Dietas, Rutinas, Publicaciones (feed con comentarios y likes), Compras (planes), Perfil y Autenticación.
Responde en español, claro y breve. Si la pregunta está fuera de alcance, orienta al usuario hacia las secciones disponibles.
Contexto relevante del sitio:\n${context}\nSi corresponde, sugiere rutas internas del sitio (ej. /dietas, /ejercicios/gym).`;

  const messages = [
    { role: 'system', content: systemPrompt },
    ...(Array.isArray(history) ? history : []),
    { role: 'user', content: userText },
  ];

  const ai = await callOpenAI(messages);
  const suggestions = suggestActions(userText);
  if (ai) return res.json({ reply: ai, suggestions, sources: related.map(r => r.topic) });

  // Fallback local si no hay OpenAI o falla
  return res.json({ reply: localFallback(userText), fallback: true, suggestions, sources: related.map(r => r.topic) });
});

export default router;