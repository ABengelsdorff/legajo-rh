"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoutSuccess, setLogoutSuccess] = useState(false);

  const router = useRouter();

  const rol = useAuthStore((state) => state.rol);
  const nombreUsuario = useAuthStore((state) => state.nombreUsuario);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  return (
    <nav className="bg-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center mt-4">
            <div className="flex-shrink-0">
              <Image
                src="/escudo_FAA1.png"
                alt="Logo Fuerza Aérea Argentina"
                width={150}
                height={150}
                className="drop-shadow-md"
              />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {!isAuthenticated ? (
                  <Link
                    href="/Login"
                    className="text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-300 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-all"
                  >
                    Iniciar Sesión
                  </Link>
                ) : rol === "ADMIN" ? (
                  <>
                    <Link
                      href="/Register"
                      className="text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-300 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-all"
                    >
                      Panel de Administración
                    </Link>
                    <span className="text-white px-4 font-medium">
                      👋 Hola, {nombreUsuario}
                    </span>
                    <button
                      onClick={() => {
                        logout();
                        setLogoutSuccess(true);
                        setTimeout(() => {
                          setLogoutSuccess(false);
                          router.push("/Login");
                        }, 2000);
                      }}
                      className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-300 text-white font-semibold rounded-lg shadow-md hover:from-red-700 hover:to-red-600 transition-all"
                    >
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/Buscador"
                      className="text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-300 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-all"
                    >
                      Buscar Legajo
                    </Link>
                    <Link
                      href="/UserForm"
                      className="text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-300 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-all"
                    >
                      Cargar Legajo
                    </Link>
                    <Link
                      href="/UserList"
                      className="text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-300 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-all"
                    >
                      Ver Usuarios
                    </Link>
                    <Link
                      href="/Graficos"
                      className="text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-300 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-all"
                    >
                      Estadísticas
                    </Link>
                    <span className="text-white px-4 font-medium">
                      👋 Hola, {nombreUsuario}
                    </span>
                    <button
                      onClick={() => {
                        logout();
                        setLogoutSuccess(true);
                        setTimeout(() => {
                          setLogoutSuccess(false);
                          router.push("/Login");
                        }, 2000);
                      }}
                      className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-300 text-white font-semibold rounded-lg shadow-md hover:from-red-700 hover:to-red-600 transition-all"
                    >
                      Cerrar sesión
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="bg-slate-700 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {!isAuthenticated ? (
              <Link
                href="/Login"
                className="text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all"
              >
                Iniciar Sesión
              </Link>
            ) : rol === "ADMIN" ? (
              <>
                <Link
                  href="/Register"
                  className="text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all"
                >
                  Panel de Administración
                </Link>
                <span className="text-white px-4 font-medium">
                  👋 Hola, {nombreUsuario}
                </span>
                <button
                  onClick={() => {
                    logout();
                    setLogoutSuccess(true);
                    setTimeout(() => {
                      setLogoutSuccess(false);
                      router.push("/Login");
                    }, 2000);
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded w-full text-left"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/Buscador"
                  className="text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all"
                >
                  Buscar Legajo
                </Link>
                <Link
                  href="/UserForm"
                  className="text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all"
                >
                  Cargar Legajo
                </Link>
                <Link
                  href="/UserList"
                  className="text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all"
                >
                  Ver Usuarios
                </Link>
                <Link
                  href="/Graficos"
                  className="text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all"
                >
                  Estadísticas
                </Link>
                <span className="text-white block px-3 py-2">
                  👋 Hola, {nombreUsuario}
                </span>
                <button
                  onClick={() => {
                    logout();
                    setLogoutSuccess(true);
                    setTimeout(() => {
                      setLogoutSuccess(false);
                      router.push("/Login");
                    }, 2000);
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded w-full text-left"
                >
                  Cerrar sesión
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <Dialog open={logoutSuccess} onOpenChange={setLogoutSuccess}>
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
                    ¡Sesión cerrada con éxito!
                  </DialogTitle>
                </DialogHeader>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
}
