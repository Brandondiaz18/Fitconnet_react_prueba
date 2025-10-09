import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-center py-4 mt-auto">
      <div className="container mx-auto">
        <p className="text-sm">
          © {new Date().getFullYear()} <strong>FitConnet</strong> — Todos los derechos reservados
        </p>
        <p className="text-xs mt-1 text-gray-400">
          Hecho con 💪 y dedicación para mejorar tu rendimiento físico.
        </p>
      </div>
    </footer>
  );
}
