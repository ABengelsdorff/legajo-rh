"use client"

import Image from "next/image"
import Link from "next/link"

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12 bg-slate-800">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative bg-stone-100 shadow-lg sm:rounded-3xl sm:p-16">
          <div className="max-w-md mx-auto text-center">
            <Image
              src="/septima.jpg"
              alt="Logo Fuerza Aérea Argentina"
              width={120}
              height={120}
              className="mx-auto mb-6"
            />
            <h1 className="text-3xl font-extrabold text-red-600 mb-4">Acceso denegado</h1>
            <p className="text-gray-700 mb-6">
              No tiene permisos para acceder a esta sección del sistema.
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md transition"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
