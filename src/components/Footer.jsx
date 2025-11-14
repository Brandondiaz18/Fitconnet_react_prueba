import React from "react";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  // Oculta el footer en las páginas de Login y Registro
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  // Se elimina el bloque de copyright/mensaje global según solicitud
  return null;
}
