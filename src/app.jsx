import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/principal/user/user.jsx";
import Login from "./pages/login/login";
import Register from "./pages/registro/register.jsx";

import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";

// Additional imports for new routes
import Compras from "./pages/compras/compras.jsx";
import Casa from "./pages/ejercicios/casa/casa.jsx";
import Gym from "./pages/ejercicios/gym/gym.jsx";
import Calistenia from "./pages/ejercicios/calistenia/calistenia.jsx";
import Perfil from "./pages/perfil/user/perfil.jsx";
import PerfilAdmin from "./pages/perfil/admin_perfil/admin_perfil.jsx";
import Publicaciones from "./pages/publicaciones/publicaciones.jsx";
import Dietas from "./pages/crear/dietas/dietas.jsx";
import Rutinas from "./pages/crear/rutinas/rutinas.jsx";
import Admin from "./pages/principal/admin/Admin.jsx";
import SinIniciar from "./pages/principal/sin_iniciar/sin_iniciar.jsx";
import EditarPerfil from "./pages/perfil/editar_perfil/editar_perfil_user/editar_perfil_user.jsx";
import EditarPerfilAdmin from "./pages/perfil/editar_perfil/editar_perfil_admin/editar_perfil_admin.jsx";
import PublicacionDetalle from "./pages/publicaciones/detalle.jsx";
import Chatbot from "./components/Chatbot.jsx";

// Función para proteger rutas (solo accesibles si el usuario está logueado)
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    // Exponer helpers globales para abrir/cerrar el chat desde cualquier página
    window.openFitChat = () => setChatOpen(true);
    window.closeFitChat = () => setChatOpen(false);
    return () => {
      delete window.openFitChat;
      delete window.closeFitChat;
    };
  }, []);
  return (
    <Router>
      <div className="container-full" style={{width: "100vw", maxWidth: "100%", overflowX: "hidden"}}>
        {/* Barra de navegación */}
        <Navbar />

        {/* Contenido principal */}
        <main style={{width: "100vw", maxWidth: "100%", overflowX: "hidden"}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Ruta protegida: Dashboard */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            {/* New routes */}
            <Route path="/compras" element={<Compras />} />
            <Route path="/ejercicios/casa" element={<Casa />} />
            <Route path="/ejercicios/gym" element={<Gym />} />
            <Route path="/ejercicios/calistenia" element={<Calistenia />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/perfil/admin" element={<PerfilAdmin />} />
            <Route path="/publicaciones" element={<Publicaciones />} />
            <Route path="/publicaciones/:id" element={<PublicacionDetalle />} />
            <Route path="/dietas" element={<Dietas />} />
            <Route path="/rutinas" element={<Rutinas />} />
            <Route path="/principal/admin" element={<Admin />} />
            <Route path="/principal/sin_iniciar" element={<SinIniciar />} />
            <Route path="/editar_perfil" element={<EditarPerfil />} />
            <Route path="/editar_perfil/admin" element={<EditarPerfilAdmin />} />
          </Routes>
        </main>

        {/* Pie de página */}
        <Footer />

        {/* Chat global (ventana flotante) */}
        <Chatbot open={chatOpen} onClose={() => setChatOpen(false)} />
      </div>
    </Router>
  );
}

export default App;
