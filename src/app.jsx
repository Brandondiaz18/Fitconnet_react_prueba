import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/principal/user/user.jsx";
import Login from "./pages/login/login";
import Register from "./pages/register";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";

// Función para proteger rutas (solo accesibles si el usuario está logueado)
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Barra de navegación */}
        <Navbar />

        {/* Contenido principal */}
        <main className="flex-grow">
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
          </Routes>
        </main>

        {/* Pie de página */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
