// src/store/useAuthStore.ts
import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  nombreUsuario: string;
  rol: string;
  exp?: number;
}

interface AuthState {
  token: string | null;
  nombreUsuario: string;
  rol: string;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  nombreUsuario: "",
  rol: "",
  isAuthenticated: false,

  setToken: (token: string) => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      localStorage.setItem("token", token);
      set({
        token,
        nombreUsuario: decoded.nombreUsuario,
        rol: decoded.rol,
        isAuthenticated: true,
      });
    } catch (e) {
      console.error("Token inválido", e);
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({
      token: null,
      nombreUsuario: "",
      rol: "",
      isAuthenticated: false,
    });
  },
}));
