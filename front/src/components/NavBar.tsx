"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
                <Link
                  href="/Buscador"
                  className="text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-300 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-all"
                >
                  Buscar Legajo
                </Link>
                <Link
                  href="/Graficos"
                  className="text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-300 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-all"
                >
                  Graficos
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
                  ver usuarios
                </Link>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/Buscador"
              className="text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all"
            >
              Buscar Legajo
            </Link>
            <Link
              href="/Graficos"
              className="text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all"
            >
              Graficos
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
          </div>
        </div>
      )}
    </nav>
  )
}

