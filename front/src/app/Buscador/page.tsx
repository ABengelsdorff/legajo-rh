"use client";

import { useState } from "react";
import { getUserByIosfa } from "../../services/userServices"; 

type SearchResult = {
  id: number;
  nombre: string;
  apellido: string;
  fechaDeNacimiento: string;
  grupoSanguineo: string;
  numeroDeDni: string;
  numeroDeCuil: string;
  direccion: string;
  codigoPostal: string;
  correoElectronico: string;
  usuarioGde: string;
  cbu: string;
  numeroDeCelular: string;
  numeroDeIosfa: string;
  rti: string;
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
  actuaciones: Array<{
    numeroDeExpediente: string;
    situacionDeRevista: string;
    disponibilidad: { desde?: string; hasta?: string };
    pasiva: { desde?: string; hasta?: string };
  }>;
  juntaMedica: Array<{
    mensaje: string;
    turnos: string;
    observacion: string;
    afeccion: string;
  }>;
};


export default function LegajoSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const iosfaNumber = Number(searchQuery);
      if (isNaN(iosfaNumber) || iosfaNumber <= 0) {
        setError("Ingrese un número de IOSFA válido.");
        setLoading(false);
        return;
      }

      const result = await getUserByIosfa(iosfaNumber);
      console.log("🔍 Datos recibidos de la API:", result);
      setSearchResults([result]);
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
              <img src="/septima.jpg" alt="Logo Fuerza Aérea Argentina" width={180} height={180} className="drop-shadow-md" />
            </div>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-extrabold text-gray-900">Búsqueda de Legajo</h1>
            </div>
            <form onSubmit={handleSearch} className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <input
                    type="number"
                    placeholder="Ingrese número de IOSFA"
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

            {loading && <p className="text-center text-blue-500">Cargando...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {searchResults.length > 0 && (
  <div className="mt-8 space-y-8 text-black">
    {searchResults.map((result) => (
      <div key={result.id} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Resultado de Búsqueda</h2>
        
        {/* Información Personal */}
       <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg mb-4">
       <h3 className="text-lg font-semibold text-gray-700 mb-2">Información Personal</h3>
       <div className="grid grid-cols-4 gap-4 text-black">
       <p><strong>Nombre:</strong> {result.nombre} {result.apellido}</p>
        <p><strong>Fecha de Nacimiento:</strong> {result.fechaDeNacimiento}</p>
        <p><strong>Grupo Sanguíneo:</strong> {result.grupoSanguineo}</p>
        <p><strong>DNI:</strong> {result.numeroDeDni}</p>
        <p><strong>CUIL:</strong> {result.numeroDeCuil}</p>
        <p><strong>Correo Electrónico:</strong> {result.correoElectronico}</p>
        <p><strong>Celular:</strong> {result.numeroDeCelular}</p>
        <p><strong>Estado Civil:</strong> {result.estadoCivil}</p>
       </div>
       </div>
        

        {/* Información Profesional */}
        <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg mb-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Información Profesional</h3>
        <div className="grid grid-cols-4 gap-4 text-black">
        <p><strong>Grado:</strong> {result.grado}</p>
        <p><strong>Cargo:</strong> {result.cargo}</p>
        <p><strong>Escalafón:</strong> {result.escalafon}</p>
        <p><strong>Especialidad:</strong> {result.especialidad}</p>
        <p><strong>Instituto de Formación:</strong> {result.institutoDeFormacion}</p>
        <p><strong>Nivel de Inglés:</strong> {result.nivelDeIngles}%</p>
        <h3><strong>Cursos Realizados</strong></h3>
        <ul className="list-disc list-inside">
          {result.cursosRealizados.length > 0 ? (
            result.cursosRealizados.map((curso, index) => <li key={index}>{curso}</li>)
          ) : (
            <li>No hay cursos registrados</li>
          )}
        </ul>
        </div>
        </div>
        

        {/* Grupo Familiar */}
        <div className=" p-4 rounded-lg mb-4 bg-blue-50  border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Grupo Familiar</h3>
        <div className=" grid grid-cols-3 gap-4 text-black ">
        {result.grupoFamiliar.length > 0 ? (
          <ul>
            {result.grupoFamiliar.map((familiar, index) => (
              <li key={index}>
                <p><strong>Parentesco:</strong> {familiar.parentesco}</p>
                <p><strong>Nombre:</strong> {familiar.nombre} {familiar.apellido}</p>
                <p><strong>DNI:</strong> {familiar.dni}</p>
                <p><strong>Personal Militar:</strong> {familiar.personalMilitar}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay datos familiares.</p>
        )}
        </div>
        </div>
      

        {/* Actuaciones */}
        <div className="p-4 rounded-lg mb-4 bg-blue-50  border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Actuaciones</h3>
        <div className="grid grid-cols-2 gap-4 text-black">
        {result.actuaciones.length > 0 ? (
          <ul>
            {result.actuaciones.map((act, index) => (
              <li key={index}>
                <p><strong>Expediente:</strong> {act.numeroDeExpediente}</p>
                <p><strong>Situación:</strong> {act.situacionDeRevista}</p>
                <p><strong>Disponibilidad:</strong> {act.disponibilidad.desde} - {act.disponibilidad.hasta}</p>
                <p><strong>Pasiva:</strong> {act.pasiva.desde} - {act.pasiva.hasta}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay actuaciones registradas.</p>
        )}
        </div>
        </div>
       

        {/* Junta Médica */}
        <div className="p-4 rounded-lg mb-4 bg-blue-50  border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Junta Médica</h3>
        <div className="grid grid-cols-2 gap-4 text-black"> 
        {result.juntaMedica.length > 0 ? (
          <ul>
            {result.juntaMedica.map((junta, index) => (
              <li key={index}>
                <p><strong>Mensaje:</strong> {junta.mensaje}</p>
                <p><strong>Turnos:</strong> {junta.turnos}</p>
                <p><strong>Observación:</strong> {junta.observacion}</p>
                
                <p><strong>Afección:</strong> {junta.afeccion}</p>
              </li>
            ))}
          </ul>
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















// "use client"

// import { useState } from "react"

// type SearchResult = {
//   id: number
//  iosfa: number
//  DNI: number
//   nombre: string
//   apellido: string
//   grado: string
//   cursos: string[]
//   grupoFamiliar: { nombre: string; relacion: string }[]
// }

// export default function LegajoSearch() {
//   const [searchType, setSearchType] = useState<"dni" | "nombre" | "curso">("dni")
//   const [searchQuery, setSearchQuery] = useState("")
//   const [searchResults, setSearchResults] = useState<SearchResult[]>([])

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault()
//     // Aquí iría la lógica de búsqueda real
//     console.log(`Buscando por ${searchType}: ${searchQuery}`)
//     // Simulación de resultados de búsqueda
//     setSearchResults([
//       {
//         id: 1,
//         iosfa: 1234,
//         DNI: 1234567,
//         nombre: "Juan",
//         apellido: "Pérez",
//         grado: "Cabo Primero",
//         cursos: ["Informática", "Comunicaciones y Redes"],
//         grupoFamiliar: [
//           { nombre: "María Pérez", relacion: "conyuge" },
//           { nombre: "Lucas Pérez", relacion: "hijo" },
//         ],
//       },
//     ])
//   }

//   return (
//     <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12 bg-slate-800">
//       <div className="relative py-3 sm:max-w-3xl sm:mx-auto">
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
//         <div className="relative px-4 py-10 bg-stone-100 shadow-lg sm:rounded-3xl sm:p-20">
//           <div className="max-w-4xl mx-auto">
//             <div className="flex justify-center mb-8">
//             <img
//                 src="/septima.jpg"
//                 alt="Logo Fuerza Aérea Argentina"
//                 width={180}
//                 height={180}
//                 className="drop-shadow-md"
//               />
//             </div>
//             <div className="text-center">
//               <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Búsqueda de Legajo</h1>
//             </div>
//             <form onSubmit={handleSearch} className="space-y-8">
//               <div className="bg-gray-50 p-6 rounded-lg shadow-md">
//                 <div className="flex flex-wrap gap-4 mb-4">
//                   <button
//                     type="button"
//                     onClick={() => setSearchType("dni")}
//                     className={`px-4 py-2 rounded-lg ${
//                       searchType === "dni" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-blue-100"
//                     } transition-colors`}
//                   >
//                     Buscar por DNI
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setSearchType("nombre")}
//                     className={`px-4 py-2 rounded-lg ${
//                       searchType === "nombre" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-blue-100"
//                     } transition-colors`}
//                   >
//                     Buscar por Nombre
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setSearchType("curso")}
//                     className={`px-4 py-2 rounded-lg ${
//                       searchType === "curso" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-blue-100"
//                     } transition-colors`}
//                   >
//                     Buscar por Curso
//                   </button>
//                 </div>
//                 <div className="flex gap-4">
//                   <input
//                     type={searchType === "dni" ? "number" : "text"}
//                     placeholder={`Ingrese ${
//                       searchType === "dni" ? "DNI" : searchType === "nombre" ? "nombre" : "curso"
//                     }`}
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="text-gray-900 flex-1 px-4 py-2 rounded-lg border-gray-300 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
//                   />
//                   <button
//                     type="submit"
//                     className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-300 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all"
//                   >
//                     Buscar
//                   </button>
//                 </div>
//               </div>
//             </form>

//             {searchResults.length > 0 && (
//               <div className="mt-8 space-y-8">
//                 {searchResults.map((result) => (
//                   <div key={result.id} className="bg-gray-50 p-6 rounded-lg shadow-md">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-4">Resultado de Búsqueda</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-900">
//                       <div>
//                         <p className="font-semibold">Nombre:</p>
//                         <p>
//                           {result.nombre} {result.apellido}
//                         </p>
//                       </div>
//                       <div>
//                         <p className="font-semibold">Grado:</p>
//                         <p>{result.grado}</p>
//                       </div>
//                       <div>
//                         <p className="font-semibold">Cursos:</p>
//                         <ul className="list-disc list-inside">
//                           {result.cursos.map((curso, index) => (
//                             <li key={index}>{curso}</li>
//                           ))}
//                         </ul>
//                       </div>
//                       <div>
//                         <p className="font-semibold">Grupo Familiar:</p>
//                         <ul className="list-disc list-inside">
//                           {result.grupoFamiliar.map((familiar, index) => (
//                             <li key={index}>
//                               {familiar.nombre} - {familiar.relacion}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {searchResults.length === 0 && searchQuery && (
//               <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md text-center">
//                 <p className="text-gray-700">No se encontraron resultados para la búsqueda.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
