"use client";

import { useState } from "react";
import {
  getUserByIosfa,
  getUserByDni,
  getUserByApellido,
  getUserByGrado,
  getUserByCurso,
} from "../../services/userServices";

type SearchResult = {
  id: number;
  nombre: string;
  apellido: string;
  sexo: string;
  fechaDeNacimiento: string;
  grupoSanguineo: string;
  numeroDeDni: string;
  numeroDeCuil: string;
  direccion: string;
  codigoPostal: string;
  correoElectronico: string;
  correoInstitucional: string;
  usuarioGde: string;
  cbu: string;
  numeroDeCelular: string;
  numeroDeIosfa: string;
  rti: string;
  destinoAnterior: string;
  institutoDeFormacion: string;
  grado: string;
  destinadoEnLaUnidad: string;
  destinoJbGrupos: string;
  destinoInterno: string;
  cargo: string;
  escalafon: string;
  especialidad: string;
  especialidadAvanzada: string;
  cursosRealizados: string[];
  formacionAcademica: string[];
  nivelDeIngles: number;
  estadoCivil: string;
  grupoFamiliar: Array<{
    parentesco: string;
    nombre: string;
    apellido: string;
    dni: string;
    personalMilitar: string;
    observaciones: string;
  }>;
  situacionDeRevista: string;
  actuaciones: Array<{
    numeroDeExpediente: string;
    afeccion: string;
    disponibilidad: { desde?: string; hasta?: string };
    pasiva: { desde?: string; hasta?: string };
  }>;
  juntaMedica: Array<{
    mensajeAeronautico: string;
    turnos: string;
    observacion: string;
    afeccion: string;
  }>;
};

export default function LegajoSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("iosfa");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let result;

      if (searchType === "iosfa") {
        const iosfaNumber = Number(searchQuery);
        if (isNaN(iosfaNumber) || iosfaNumber <= 0) {
          setError("Ingrese un número de IOSFA válido.");
          setLoading(false);
          return;
        }
        result = await getUserByIosfa(iosfaNumber);


      } else if (searchType === "dni") {
        const dniNumber = Number(searchQuery);
        if (isNaN(dniNumber) || dniNumber <= 0) {
          setError("Ingrese un DNI válido.");
          setLoading(false);
          return;
        }
        result = await getUserByDni(dniNumber);


      } else if (searchType === "apellido") {
        if (!searchQuery.trim()) {
          setError("Ingrese un apellido válido.");
          setLoading(false);
          return;
        }
        result = await getUserByApellido(searchQuery);


      } else if (searchType === "grado") {
        if (!searchQuery.trim()) {
          setError("Ingrese un grado válido.");
          setLoading(false);
          return;
        }
        result = await getUserByGrado(searchQuery);

        
      } else if (searchType === "curso") {
        if (!searchQuery.trim()) {
          setError("Ingrese un curso válido.");
          setLoading(false);
          return;
        }
        result = await getUserByCurso(searchQuery);
      }

      console.log("🔍 Datos recibidos de la API:", result);
      setSearchResults(Array.isArray(result) ? result : [result]);
    } catch {
      setError("No se encontraron resultados.");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12 bg-slate-800">
      <div className="relative py-3 sm:max-w-6xl sm:mx-auto px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative bg-stone-100 shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-full mx-auto">
            <div className="flex justify-center mb-8">
              <img
                src="/septima.jpg"
                alt="Logo Fuerza Aérea Argentina"
                width={180}
                height={180}
                className="drop-shadow-md"
              />
            </div>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-extrabold text-gray-900">
                Búsqueda de Legajo
              </h1>
            </div>
            <form onSubmit={handleSearch} className="space-y-8">
              {/* Botones para seleccionar el criterio de búsqueda */}
              <div className="flex flex-wrap gap-4 mb-4 justify-center">
                <button
                  type="button"
                  onClick={() => setSearchType("iosfa")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    searchType === "iosfa"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  Buscar por IOSFA
                </button>
                <button
                  type="button"
                  onClick={() => setSearchType("dni")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    searchType === "dni"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  Buscar por DNI
                </button>
                <button
                  type="button"
                  onClick={() => setSearchType("apellido")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    searchType === "apellido"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  Buscar por Apellido
                </button>
                <button
                  type="button"
                  onClick={() => setSearchType("grado")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    searchType === "grado"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  Buscar por Grado
                </button>
                <button
                  type="button"
                  onClick={() => setSearchType("curso")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    searchType === "curso"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  Buscar por Curso
                </button>
              </div>
              {/* Campo de búsqueda */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <input
                    // Usamos "number" solo para IOSFA y DNI, y "text" para los demás
                    type={
                      searchType === "iosfa" || searchType === "dni"
                        ? "number"
                        : "text"
                    }
                    placeholder={
                      searchType === "iosfa"
                        ? "Ingrese número de IOSFA"
                        : searchType === "dni"
                        ? "Ingrese DNI"
                        : searchType === "apellido"
                        ? "Ingrese apellido"
                        : searchType === "grado"
                        ? "Ingrese grado"
                        : "Ingrese curso"
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-gray-900 flex-1 px-4 py-2 rounded-lg border-gray-300 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-300 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-600 transition-all"
                  >
                    Buscar
                  </button>
                </div>
              </div>
            </form>

            {loading && (
              <div className="flex justify-center mt-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}

            {error && (
              <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center">
                {error}
              </div>
            )}

            {searchResults.length > 0 && (
              <div className="mt-8 space-y-8 text-black">
                {searchResults.map((result) => (
                  <div key={result.id} className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Resultado de Búsqueda</h2>

                    {/* Información Personal */}
                    <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg mb-4">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">Información Personal</h3>
                      <div className="grid grid-cols-4 gap-4 text-black">
                        <p>
                          <strong>Nombre:</strong> {result.nombre} {result.apellido}
                        </p>
                        <p>
                          <strong>Sexo:</strong> {result.sexo}
                        </p>

                        <p>
                        <strong>Fecha de Nacimiento:</strong>{' '} {result.fechaDeNacimiento ? new Date(result.fechaDeNacimiento).toLocaleDateString('es-AR') : 'No definida'}
                        </p>

                        <p>
                          <strong>DNI:</strong> {result.numeroDeDni}
                        </p>
                        <p>
                          <strong>CUIL:</strong> {result.numeroDeCuil}
                        </p>
                        <p>
                          <strong>Grupo Sanguíneo:</strong> {result.grupoSanguineo}
                        </p>
                        <p>
                          <strong>Dirección:</strong> {result.direccion}
                        </p>
                        <p>
                          <strong>Código Postal:</strong> {result.codigoPostal}
                        </p>
                        <p>
                          <strong>Correo Electrónico:</strong> {result.correoElectronico}
                        </p>
                        <p>
                          <strong>CBU:</strong> {result.cbu}
                        </p>
                        <p>
                          <strong>Celular:</strong> {result.numeroDeCelular}
                        </p>
                        <p>
                          <strong>Formación Académica:</strong> {result.formacionAcademica}
                        </p>
                        <p>
                          <strong>Estado Civil:</strong> {result.estadoCivil}
                        </p>
                      </div>
                    </div>

                    {/* Información Profesional */}
                    <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg mb-4">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">Información Profesional</h3>
                      <div className="grid grid-cols-4 gap-4 text-black">
                        <p>
                          <strong>Destinado en la unidad:</strong> {result.destinadoEnLaUnidad}
                        </p>
                        <p>
                          <strong>Numero de IOSFA:</strong> {result.numeroDeIosfa}
                        </p>
                        <p>
                          <strong>Instituto de Formación:</strong> {result.institutoDeFormacion}
                        </p>
                        <p>
                          <strong>Escalafón:</strong> {result.escalafon}
                        </p>
                        <p>
                          <strong>Grado:</strong> {result.grado}
                        </p>
                        <p>
                          <strong>Destino:</strong> {result.destinoJbGrupos}
                        </p>
                        <p>
                          <strong>Destino Interno:</strong> {result.destinoInterno}
                        </p>
                        <p>
                          <strong>Cargo:</strong> {result.cargo}
                        </p>
                        <p>
                          <strong>Especialidad:</strong> {result.especialidad}
                        </p>
                        <p>
                          <strong>Especialidad Avanzada:</strong> {result.especialidadAvanzada}
                        </p>
                        <p>
                          <strong>Nivel de Inglés:</strong> {result.nivelDeIngles}%
                        </p>
                        <p>
                          <strong>RTI:</strong> {result.rti}
                        </p>
                        <p>
                          <strong>Destino anterior:</strong> {result.destinoAnterior}
                        </p>
                        <p>
                          <strong>Correo Institucional:</strong> {result.correoInstitucional}
                        </p>
                        <p>
                          <strong>Usuario GDE:</strong> {result.usuarioGde}
                        </p>



                        <div className="col-span-4">
                          <h3 className="font-semibold">Cursos Realizados</h3>
                          <ul className="list-disc list-inside">
                            {result.cursosRealizados.length > 0 ? (
                              result.cursosRealizados.map((curso, index) => (
                                <li key={index}>{curso}</li>
                              ))
                            ) : (
                              <li>No hay cursos registrados</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Grupo Familiar */}
                    <div className="p-4 rounded-lg mb-4 bg-blue-50 border border-blue-200">
  <h3 className="text-lg font-semibold text-gray-700 mb-2">Grupo Familiar</h3>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-black">
    {result.grupoFamiliar.length > 0 ? (
      result.grupoFamiliar.map((familiar, index) => (
        <div key={index} className="border p-5 rounded bg-white">
          <p><strong>Nombre:</strong> {familiar.nombre} {familiar.apellido}</p>
          <p><strong>DNI:</strong> {familiar.dni}</p>
          <p><strong>Parentesco:</strong> {familiar.parentesco}</p>
          <p><strong>Personal Militar:</strong> {familiar.personalMilitar}</p>
          <p><strong>Observaciones:</strong> {familiar.observaciones} </p>
        </div>
      ))
    ) : (
      <p>No hay datos familiares.</p>
    )}
  </div>
</div>


  {/* Situacion de revista */}
  <div className="p-4 rounded-lg mb-4 bg-blue-50 border border-blue-200">
  <h3 className="text-lg font-semibold text-gray-700 mb-2">Situacion De Revista</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
        <div className="border p-5 rounded bg-white">
          <p><strong>Situacion:</strong> {result.situacionDeRevista}</p>
        </div>
  </div>
</div>



                    {/* Actuaciones */}
                    <div className="p-4 rounded-lg mb-4 bg-blue-50 border border-blue-200">
  <h3 className="text-lg font-semibold text-gray-700 mb-2">Actuaciones</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
    {result.actuaciones.length > 0 ? (
      result.actuaciones.map((act, index) => (
        <div key={index} className="border p-5 rounded bg-white">
          <p><strong>Expediente:</strong> {act.numeroDeExpediente}</p>
          <p>
            <strong>Afección:</strong> {act.afeccion}
          </p>
          <p>
            <strong>Disponibilidad:</strong> {act.disponibilidad.desde} - {act.disponibilidad.hasta}
          </p>
          <p>
            <strong>Pasiva:</strong> {act.pasiva.desde} - {act.pasiva.hasta}
          </p>
        </div>
      ))
    ) : (
      <p>No hay actuaciones registradas.</p>
    )}
  </div>
</div>


                    {/* Junta Médica */}
                    <div className="p-4 rounded-lg mb-4 bg-blue-50 border border-blue-200">
  <h3 className="text-lg font-semibold text-gray-700 mb-2">Junta Médica</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
    {result.juntaMedica.length > 0 ? (
      result.juntaMedica.map((junta, index) => (
        <div key={index} className="border p-5 rounded bg-white">
          <p><strong>Mensaje Aeronáutico:</strong> {junta.mensajeAeronautico}</p>
          <p><strong>Turnos:</strong> {junta.turnos}</p>
          <p><strong>Observación:</strong> {junta.observacion}</p>
          <p><strong>Afección:</strong> {junta.afeccion}</p>
        </div>
      ))
    ) : (
      <p>No hay registros de Junta Médica.</p>
    )}
  </div>
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

  

