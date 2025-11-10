# FitConnect

## Estructura de estilos y activos

### Sistema de diseño
Usamos variables CSS definidas en `src/index.css` para colores, tipografía, espaciado, sombras y radios. Las clases utilitarias principales:
- `.page`: contenedor de página con padding y ancho máximo.
- `.card`: superficie elevada con borde y sombra suave.
- `.btn`: botón base con variantes (primario usando `--color-primary`).

### Dónde colocar imágenes
Para que todas las páginas puedan usar imágenes sin problemas en Vite:
- Crea la carpeta `public/img` en la raíz del proyecto.
- Coloca dentro tus imágenes: `public/img/logo.png`, `public/img/gym.jpeg`, etc.
- Referéncialas en React/HTML con rutas absolutas: `src="/img/logo.png"`.
  - Ejemplo: `<img src="/img/Seccion2.png" alt="Bienvenida" />`

Alternativa (importar en componentes):
- Importa el archivo directamente en el componente:
  ```jsx
  import heroImage from '/public/img/Seccion2.png';
  // o desde assets empaquetados: import heroImage from '../assets/Seccion2.png';
  <img src={heroImage} alt="Bienvenida" />
  ```
- Si usas `src/assets`, Vite empaqueta y resuelve la ruta automáticamente.

### Recomendaciones por página
- Home: usa una imagen hero en `#inicio` y tarjetas `.card` para planes, rutinas y dietas.
- Perfil: avatar y portada en una `.perfil-card`; botones con `.btn`.
- Publicaciones: miniaturas dentro de `.post-card` y cabeceras con `.page`.
- Ejercicios/Dietas/Rutinas: rejillas con `.grid-sections` y fondos `var(--color-surface)`.

### Buenas prácticas
- Mantén todas las imágenes compartidas en `public/img` o `src/assets`.
- Evita rutas relativas profundas; usa `/img/...` para estáticos públicos.
- Optimiza imágenes grandes (WebP/JPEG) y define `alt` descriptivos.
