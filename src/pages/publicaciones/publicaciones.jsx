import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./publicaciones.css";

const Publicaciones = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Cargar publicaciones del backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/publicaciones");
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          // Fallback a datos de ejemplo si el API no responde
          setPosts([
            {
              id: 1,
              autor: "Santiago",
              contenido: "No siempre vas a tener ganas de entrenar, pero cada vez que decides hacerlo, estás venciendo a tu versión más débil y construyendo a la más fuerte.",
              imagen_url: null,
              likes: 0,
            },
            {
              id: 2,
              autor: "Paola",
              contenido: "La constancia supera al talento cuando el talento no es constante.",
              imagen_url: null,
              likes: 5,
            },
            {
              id: 3,
              autor: "Miguel",
              contenido: "Cada día es una nueva oportunidad para mejorar.",
              imagen_url: null,
              likes: 2,
            },
          ]);
        }
      } catch (err) {
        console.error("Error cargando publicaciones:", err);
        setError("No se pudieron cargar las publicaciones");
        // Usar datos de ejemplo como fallback
        setPosts([
          {
            id: 1,
            autor: "Santiago",
            contenido: "No siempre vas a tener ganas de entrenar, pero cada vez que decides hacerlo, estás venciendo a tu versión más débil y construyendo a la más fuerte.",
            imagen_url: null,
            likes: 0,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const verMas = (post) => {
    navigate(`/publicaciones/${post.id}`, { state: post });
  };

  const crearPublicacion = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión para crear publicaciones");
      return;
    }

    const contenido = prompt("Escribe tu publicación:");
    if (!contenido) return;

    try {
      const response = await fetch("http://localhost:8000/api/publicaciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ contenido }),
      });

      if (response.ok) {
        const nuevaPublicacion = await response.json();
        setPosts([nuevaPublicacion, ...posts]);
      } else {
        alert("Error creando la publicación");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error de conexión");
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>Cargando publicaciones...</p>
      </div>
    );
  }

  return (
    <div className="publicaciones-page">
      {/* HEADER */}
      <header>
        <div className="logo">
          <img src="/img/logo.png" alt="logo" />
          <h1>FitConnet</h1>
        </div>
        <h2>Publicaciones</h2>
        <div className="perfil">
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="perfil"
          />
          <button className="logout" onClick={() => navigate("/")}>⮐</button>
        </div>
      </header>

      {/* MAIN */}
      <main>
        <aside className="amigos">
          <h3>Amigos</h3>
          <ul>
            <li>
              <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="Paola" /> Paola
            </li>
            <li>
              <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="Miguel" /> Miguel
            </li>
            <li>
              <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="Santiago" /> Santiago
            </li>
            <li>
              <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="Ronaldo" /> Ronaldo
            </li>
            <li>
              <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="Ángel" /> Ángel
            </li>
            <li>
              <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="Jessica" /> Jessica
            </li>
          </ul>
        </aside>

        <section className="publicaciones">
          <button 
            id="btn-nueva-publicacion" 
            className="nueva-publicacion"
            onClick={crearPublicacion}
          >
            ➕ Nueva publicación
          </button>

          {error && (
            <div style={{ color: "red", padding: "10px", textAlign: "center" }}>
              {error}
            </div>
          )}

          {/* Listado de publicaciones */}
          {posts.map((post) => (
            <article className="post" key={post.id}>
              <h4>
                <a href="#" onClick={(e) => { e.preventDefault(); verMas(post); }}>
                  {post.autor}
                </a>
              </h4>
              <p>
                <em>{post.contenido}</em>
              </p>
              {post.imagen_url && <img src={post.imagen_url} alt={post.autor} />}
              <div className="acciones">
                <button className="like">♥️</button>
                <span className="contador-likes">{post.likes}</span>
                <button onClick={() => verMas(post)}>Ver más</button>
              </div>
            </article>
          ))}

          {posts.length === 0 && !loading && (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <p>No hay publicaciones aún. ¡Sé el primero en compartir algo!</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Publicaciones;
