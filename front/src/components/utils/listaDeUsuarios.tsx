"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getAllUsers } from "../../services/userServices";
import type { IUser } from "@/components/interfaces/interfaces";
import { UserRound, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Users() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data: IUser[] = await getAllUsers();

        // Ordenar usuarios alfabéticamente por apellido
        const sortedUsers = [...data].sort((a, b) =>
          a.apellido.localeCompare(b.apellido)
        );

        setUsers(sortedUsers);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        setError(
          "No se pudieron cargar los usuarios. Por favor, intente nuevamente más tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Agrupar usuarios por la primera letra del apellido
  const groupedUsers: Record<string, IUser[]> = {};

  users.forEach((user) => {
    const firstLetter = user.apellido.charAt(0).toUpperCase();
    if (!groupedUsers[firstLetter]) {
      groupedUsers[firstLetter] = [];
    }
    groupedUsers[firstLetter].push(user);
  });

  // Obtener las letras ordenadas para la navegación alfabética
  const sortedLetters = Object.keys(groupedUsers).sort();

  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12 bg-slate-800">
      <div className="relative py-3 sm:max-w-6xl sm:mx-auto px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative bg-stone-100 shadow-lg sm:rounded-3xl sm:p-10">
          <div className="max-w-full mx-auto">
            <div className="flex justify-center mb-8">
              <Image
                src="/septima.jpg"
                alt="Logo Fuerza Aérea Argentina"
                width={180}
                height={180}
                className="drop-shadow-md"
              />
            </div>

            <div className="mb-8  ">
              <div>
                <h1 className="text-4xl font-extrabold text-gray-900 justify-center items-center flex">
                  Listado de Personal
                </h1>
                <p className="text-gray-600 mt-2 justify-center items-center flex">
                  Ordenado alfabéticamente por apellido
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <button
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = "http://localhost:3001/users/export/excel";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  
                  className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-300 text-white font-semibold rounded-lg shadow-sm hover:from-blue-700 hover:to-blue-600 transition-all ml-auto"
                >
                  Exportar a Excel
                </button>
              </div>
            </div>

            {loading && (
              <div className="flex justify-center my-12">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}

            {error && (
              <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center">
                {error}
              </div>
            )}

            {!loading && !error && users.length > 0 && (
              <div className="mt-8">
                {/* Alphabet index */}
                <div className="flex flex-wrap justify-center gap-2 mb-6 sticky top-0 bg-stone-100 py-2 z-10">
                  {sortedLetters.map((letter) => (
                    <a
                      key={letter}
                      href={`#letter-${letter}`}
                      className="w-8 h-8 flex items-center justify-center bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold rounded-full transition-colors"
                    >
                      {letter}
                    </a>
                  ))}
                </div>

                {/* User list grouped by first letter */}
                {sortedLetters.map((letter) => (
                  <div key={letter} id={`letter-${letter}`} className="mb-8">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg shadow-md mb-4">
                      <h2 className="text-2xl font-bold">{letter}</h2>
                    </div>

                    <div className="space-y-4">
                      {groupedUsers[letter].map((user) => (
                        <div
                          key={user.id}
                          className="bg-white p-4 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                            <div className="flex items-center mb-3 sm:mb-0">
                              <div className="bg-blue-100 p-2 rounded-full mr-4">
                                <UserRound className="h-8 w-8 text-blue-600" />
                              </div>
                              <div className="m-4">
                                <h3 className="text-lg font-bold text-gray-800">
                                  {user.apellido} {user.nombre}, {user.cargo}
                                </h3>
                                <p className="text-gray-600">
                                  ACTIVO:{" "}
                                  {user.activo}
                                </p>
                              </div>
                            </div>

                            
                              {user.especialidad && (
                                <div className="flex items-center text-gray-600">
                                  <span>ESPECIALIDAD: {user.especialidad}</span>
                                </div>
                              )}

                              <Link
                                href={`/Buscador`}
                                className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-300 text-white font-semibold rounded-lg shadow-sm hover:from-blue-700 hover:to-blue-600 transition-all ml-auto"
                              >
                                BUSCAR <ChevronRight className="h-4 w-4" />
                              </Link>
                            </div>
                          </div>
                       
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
