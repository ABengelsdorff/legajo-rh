// src/hooks/useAuth.ts
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  rol: string;
  exp?: number;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rol, setRol] = useState("");
  const [loading, setLoading] = useState(true); // 👈 nuevo

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setIsAuthenticated(true);
        setRol(decoded.rol || "");
      } catch (e) {
        console.error("Token inválido", e);
        setIsAuthenticated(false);
        setRol("");
      }
    }
    setLoading(false); // 👈 ya terminó de verificar
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setRol("");
  };

  return { isAuthenticated, rol, loading, logout };
}
