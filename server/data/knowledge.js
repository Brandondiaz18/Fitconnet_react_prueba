export const KNOWLEDGE = [
  {
    topic: 'Dietas',
    route: '/dietas',
    keywords: ['dieta', 'alimentación', 'nutrición', 'definición', 'volumen', 'equilibrada'],
    summary: 'Ofrecemos dietas personalizadas: Definición (baja en grasa, alta en proteína), Volumen (superávit calórico limpio), Equilibrada (balance proteinas/carbs/grasas).',
  },
  {
    topic: 'Rutinas',
    route: '/rutinas',
    keywords: ['rutina', 'plan de entrenamiento', 'series', 'repeticiones'],
    summary: 'Rutinas por nivel: principiante, intermedia y avanzada, orientadas a fuerza y resistencia progresiva.',
  },
  {
    topic: 'Gimnasio',
    route: '/ejercicios/gym',
    keywords: ['gimnasio', 'gym', 'pesas', 'máquinas'],
    summary: 'Crea y gestiona ejercicios de gimnasio con grupos musculares, series y repeticiones. Guarda en localStorage.',
  },
  {
    topic: 'Calistenia',
    route: '/ejercicios/calistenia',
    keywords: ['calistenia', 'peso corporal', 'dominadas', 'flexiones'],
    summary: 'Rutinas con peso corporal; puedes añadir ejercicios personalizados y verlos como tarjetas.',
  },
  {
    topic: 'Casa',
    route: '/ejercicios/casa',
    keywords: ['casa', 'home workout', 'flexiones', 'sentadillas', 'plancha'],
    summary: 'Rutinas caseras con tarjetas de ejercicios predefinidos y opción de navegación a otros apartados.',
  },
  {
    topic: 'Publicaciones',
    route: '/publicaciones',
    keywords: ['publicaciones', 'post', 'feed', 'comentarios', 'likes'],
    summary: 'Feed para crear, ver, comentar y dar like a publicaciones; con detalle y contador de reacciones.',
  },
  {
    topic: 'Compras',
    route: '/compras',
    keywords: ['compras', 'planes', 'precio', 'suscripción'],
    summary: 'Sección de planes con diferentes precios; compra y administración de suscripción.',
  },
  {
    topic: 'Perfil',
    route: '/perfil',
    keywords: ['perfil', 'cuenta', 'usuario', 'editar'],
    summary: 'Gestión de perfil de usuario y edición de datos personales y ajustes.',
  },
  {
    topic: 'Contacto',
    route: '/#contacto',
    keywords: ['contacto', 'correo', 'teléfono', 'email', 'ayuda'],
    summary: 'Información de contacto del equipo y horarios de atención.',
  },
  {
    topic: 'Horarios',
    route: '/#contacto',
    keywords: ['horario', 'hora', 'apertura', 'cierre'],
    summary: 'Horarios: L-V 6:00–22:00; fines de semana 8:00–18:00.',
  },
];

export function retrieve(text) {
  const t = String(text || '').toLowerCase();
  const scored = KNOWLEDGE.map(k => ({
    k,
    score: k.keywords.reduce((acc, kw) => acc + (t.includes(kw) ? 1 : 0), 0)
  }))
  .filter(x => x.score > 0)
  .sort((a, b) => b.score - a.score)
  .slice(0, 3)
  .map(x => x.k);
  return scored;
}

export function suggestActions(text) {
  const matches = retrieve(text);
  if (matches.length) {
    return matches.map(m => ({ label: m.topic, route: m.route }));
  }
  // Sugerencias generales
  return [
    { label: 'Dietas', route: '/dietas' },
    { label: 'Gimnasio', route: '/ejercicios/gym' },
    { label: 'Calistenia', route: '/ejercicios/calistenia' },
  ];
}