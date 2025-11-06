import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./publicaciones.css";

const PublicacionDetalle = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [post, setPost] = useState(state || null);
  const [loading, setLoading] = useState(!state);
  const [error, setError] = useState("");

  // Cargar publicación del backend si no viene del state
  useEffect(() => {
    if (!post && id) {
      const fetchPost = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/publicaciones/${id}`);
          if (response.ok) {
            const data = await response.json();
            setPost(data);
          } else {
            setError("Publicación no encontrada");
          }
        } catch (err) {
          console.error("Error cargando publicación:", err);
          setError("Error de conexión");
        } finally {
          setLoading(false);
        }
      };

      fetchPost();
    }
  }, [id, post]);

  return (
    <div>
      {/* HEADER */}
      <header>
        <div className="logo">
          <img src="/img/logo.png" alt="logo" />
          <h1>FitConnet</h1>
        </div>
        <h2>Detalle de publicación</h2>
        <div className="perfil">
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="perfil"
          />
          <button className="logout" onClick={() => navigate(-1)}>⮐</button>
        </div>
      </header>

      {/* MAIN */}
      <main style={{ gridTemplateColumns: "1fr", paddingTop: 30 }}>
        <section className="publicaciones">
          <article className="post">
            <h4>
              {post ? post.autor : `Publicación #${id}`}
            </h4>
            <p>
              <em>
                {post ? post.texto : "No hay datos de la publicación en esta vista. Vuelve a Publicaciones y entra de nuevo con 'Ver más' para ver el detalle completo."}
              </em>
            </p>
            {post?.imagen && <img src={post.imagen} alt={post.autor} />}
            <div className="acciones">
              <button className="like">♥️</button>
              <span className="contador-likes">{post ? post.likes : 0}</span>
              <button onClick={() => navigate("/publicaciones")}>Volver</button>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default PublicacionDetalle;