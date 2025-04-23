"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff, LogIn, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuthStore } from "@/store/useAuthStore";

// 🧠 Detectar si estamos en Electron
declare global {
  interface Window {
    process?: {
      type?: string;
    };
  }
}

const isElectron = Boolean(
  typeof process !== "undefined" &&
  process.versions &&
  process.versions.electron
);

const API_URL = isElectron ? "" : "http://localhost:3001";

export default function LoginForm() {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!nombreUsuario || !contraseña) {
      setError("Debe completar todos los campos.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ nombreUsuario, contraseña }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión.");
      }

      localStorage.setItem("token", data.token);
      setToken(data.token);

      console.log("Login exitoso:", data);
      setLoginSuccess(true);

      const decodedToken = JSON.parse(atob(data.token.split(".")[1]));
      const userRole = decodedToken.rol;

      setTimeout(() => {
        if (userRole === "ADMIN") {
          router.push("/Register");
        } else {
          router.push("/Buscador");
        }
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12 bg-slate-800">
      <Dialog open={loginSuccess} onOpenChange={setLoginSuccess}>
        <DialogContent className="max-w-md p-0 overflow-hidden border-none shadow-lg bg-transparent [&>button]:hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-3xl"></div>
            <div className="relative bg-stone-100 shadow-lg rounded-3xl p-8">
              <div className="flex flex-col items-center">
                <div className="mx-auto my-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                  <Check className="h-12 w-12 text-blue-600" strokeWidth={3} />
                </div>
                <DialogHeader className="pb-2">
                  <DialogTitle className="text-3xl font-extrabold text-gray-900 text-center">
                    ¡Sesión iniciada con éxito!
                  </DialogTitle>
                </DialogHeader>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="relative py-3 sm:max-w-xl sm:mx-auto px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative bg-stone-100 shadow-lg sm:rounded-3xl sm:p-16">
          <div className="max-w-md mx-auto">
            <div className="flex justify-center mb-8">
              <Image
                src="/septima.jpg"
                alt="Logo Fuerza Aérea"
                width={120}
                height={120}
              />
            </div>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900">
                Iniciar Sesión
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="nombreUsuario"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nombre de Usuario
                    </label>
                    <input
                      id="nombreUsuario"
                      type="text"
                      value={nombreUsuario}
                      onChange={(e) => setNombreUsuario(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ingrese su nombre de usuario"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contraseña"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Contraseña
                    </label>
                    <div className="relative">
                      <input
                        id="contraseña"
                        type={showPassword ? "text" : "password"}
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ingrese su contraseña"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-300 text-white font-semibold rounded-lg shadow-md flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                ) : (
                  <>
                    <LogIn className="h-5 w-5" />
                    Iniciar Sesión
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
