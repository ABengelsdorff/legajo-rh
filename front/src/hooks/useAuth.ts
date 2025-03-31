// src/hooks/useAuth.ts
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  rol: string;
  nombreUsuario: string;
  exp?: number;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rol, setRol] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setIsAuthenticated(true);
        setRol(decoded.rol || "");
        setNombreUsuario(decoded.nombreUsuario || "");
      } catch (e) {
        console.error("Token inválido", e);
        setIsAuthenticated(false);
        setRol("");
        setNombreUsuario("");
      }
    }
    setLoading(false); // 👈 ya terminó de verificar
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setRol("");
    setNombreUsuario("");
  };

  return { isAuthenticated, rol, nombreUsuario, loading, logout };
}
