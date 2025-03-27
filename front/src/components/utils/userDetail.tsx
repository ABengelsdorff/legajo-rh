import React from "react"
import { IUser } from "@/components/interfaces/interfaces"

interface Props {
  user: IUser
}

const UserDetail: React.FC<Props> = ({ user }) => {
  return (
    <div className="space-y-6">
      {/* Información Personal */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Información Personal</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <p><strong>Nombre Completo:</strong> {user.nombre} {user.apellido}</p>
          <p><strong>Sexo:</strong> {user.sexo}</p>
          <p><strong>Fecha de Nacimiento:</strong> {user.fechaDeNacimiento ? new Date(user.fechaDeNacimiento).toLocaleDateString("es-AR") : "No definida"}</p>
          <p><strong>DNI:</strong> {user.numeroDeDni}</p>
          <p><strong>CUIL:</strong> {user.numeroDeCuil}</p>
          <p><strong>Grupo Sanguíneo:</strong> {user.grupoSanguineo}</p>
          <p><strong>Correo Electrónico:</strong> {user.correoElectronico}</p>
          <p><strong>Celular:</strong> {user.numeroDeCelular}</p>
          <p><strong>Formación Académica:</strong> {user.formacionAcademica}</p>
          <p><strong>Estado Civil:</strong> {user.estadoCivil}</p>
        </div>
      </div>

      {/* Información Profesional */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Información Profesional</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <p><strong>Destinado en la unidad:</strong> {user.destinadoEnLaUnidad}</p>
          <p><strong>Número de IOSFA:</strong> {user.numeroDeIosfa}</p>
          <p><strong>Instituto de Formación:</strong> {user.institutoDeFormacion}</p>
          <p><strong>Escalafón:</strong> {user.escalafon}</p>
          <p><strong>Grado:</strong> {user.grado}</p>
          <p><strong>Destino:</strong> {user.destinoJbGrupos}</p>
          <p><strong>Destino Interno:</strong> {user.destinoInterno}</p>
          <p><strong>Cargo:</strong> {user.cargo}</p>
          <p><strong>Especialidad:</strong> {user.especialidad}</p>
          <p><strong>Especialidad Avanzada:</strong> {user.especialidadAvanzada}</p>
          <p><strong>Nivel de Inglés:</strong> {user.nivelDeIngles}%</p>
          <p><strong>RTI:</strong> {user.rti}</p>
          <p><strong>Destino anterior:</strong> {user.destinoAnterior}</p>
          <p><strong>Correo Institucional:</strong> {user.correoInstitucional}</p>
          <p><strong>Usuario GDE:</strong> {user.usuarioGde}</p>
        </div>
      </div>

      {/* Cursos Realizados */}
      <div className="p-4 rounded-lg mb-4 bg-blue-50 border border-blue-200">
        <h3 className="font-semibold">Cursos Realizados</h3>
        <ul className="list-disc list-inside">
          {user.cursosRealizados.length > 0 ? (
            user.cursosRealizados.map((curso, index) => <li key={index}>{curso}</li>)
          ) : (
            <li>No hay datos de Cursos Realizados</li>
          )}
        </ul>
      </div>

        {/* Grupo Familiar */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
  <h3 className="text-lg font-semibold text-gray-700 mb-2">Grupo Familiar</h3>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-black">
    {user.grupoFamiliar.length > 0 ? (
      user.grupoFamiliar.map((familiar, index) => (
        <div key={index} className="border p-5 rounded bg-white">
          <p><strong>Nombre:</strong> {familiar.nombre} {familiar.apellido}</p>
          <p><strong>DNI:</strong> {familiar.dni}</p>
          <p><strong>Parentesco:</strong> {familiar.parentesco}</p>
          <p><strong>Personal Militar:</strong> {familiar.personalMilitar}</p>
          <p><strong>Observaciones:</strong> {familiar.observaciones} </p>
        </div>
      ))
    ) : (
      <p>No hay datos de Grupo Familiar.</p>
    )}
  </div>
</div>


  {/* Situacion de revista */}
  <div className="p-4 rounded-lg mb-4 bg-blue-50 border border-blue-200">
  <h3 className="text-lg font-semibold text-gray-700 mb-2">Situacion De Revista</h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
      <p><strong>Situacion:</strong> {user.situacionDeRevista}</p>
  </div>
</div>  


 {/* Compromiso de servicio */}
<div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
  <h3 className="text-lg font-semibold text-gray-700 mb-2">Compromiso de Servicio</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
    <p><strong>Compromiso de Servicio:</strong> {user.compromisoDeServicio || "No registrado"}</p>
    <p>
  <strong>Compromiso de Servicio:</strong>{" "}
  {user.compromisoDeServicio ?? "No registrado"}
</p>
    <p><strong>Último Ascenso:</strong> {user?.ultimoAscenso? new Date(user.ultimoAscenso).toLocaleDateString("es-AR") : "No definido"}</p>
    <p><strong>Foto de Legajo:</strong> {user.fotoDeLegajo || "No definido"}</p>
  </div>
</div>


{/* Solicitudes */}

<div className="p-4 rounded-lg mb-4 bg-blue-50 border border-blue-200">
  <h3 className="text-lg font-semibold text-gray-700 mb-2">Solicitudes</h3>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-black">
    {user.solicitudes.length > 0 ? (
      user.solicitudes.map((solicitud, index) => (
        <div key={index} className="border p-5 rounded bg-white">
          <p><strong>Número de Expediente:</strong> {solicitud.numeroDeExpediente}</p>
          <p><strong>Solicitud Desde:</strong> {" "} {solicitud.solicitud?.desde ? new Date(solicitud.solicitud.desde).toLocaleDateString("es-AR") : "No definida"}</p>
          <p><strong>Observaciones:</strong> {solicitud.observaciones} </p>
        </div>
      ))
    ) : (
      <p>No hay datos de Solicitudes.</p>
    )}
  </div>
</div>





                    {/* Actuaciones */}
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
  <h3 className="text-lg font-semibold text-gray-700 mb-2">Actuaciones por Enfermedad</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
    {user.actuaciones.length > 0 ? (
      user.actuaciones.map((act, index) => (
        <div key={index} className="border p-5 rounded bg-white">
          <p><strong>Expediente:</strong> {act.numeroDeExpediente}</p>
          <p>
            <strong>Afección:</strong> {act.afeccion}
          </p>
          <p>
  <strong>Disponibilidad:</strong>{" "}
  {act.disponibilidad.desde
    ? new Date(act.disponibilidad.desde).toLocaleDateString("es-AR")
    : "No definida"}{" "}
  -{" "}
  {act.disponibilidad.hasta
    ? new Date(act.disponibilidad.hasta).toLocaleDateString("es-AR")
    : "No definida"}
</p>
<p>
  <strong>Pasiva:</strong>{" "}{act.pasiva.desde? new Date(act.pasiva.desde).toLocaleDateString("es-AR"): "No definida"}{" "}-
  {" "}{act.pasiva.hasta? new Date(act.pasiva.hasta).toLocaleDateString("es-AR"): "No definida"}
</p>

        </div>
      ))
    ) : (
      <p>No hay Actuaciones por Enfermedad registradas.</p>
    )}
  </div>
</div> 


{/* Parte de Enfermo */}
<div className="p-4 rounded-lg mb-4 bg-blue-50 border border-blue-200">
  <h3 className="text-lg font-semibold text-gray-700 mb-2">Parte de Enfermo</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
    {user.parteDeEnfermo.length > 0 ? (
      user.parteDeEnfermo.map((parte, index) => (
        <div key={index} className="border p-5 rounded bg-white">
          <p>
            <strong>Periodo:</strong>{" "}
            {parte.inicio
              ? new Date(parte.inicio).toLocaleDateString("es-AR")
              : "No definido"}{" "}
            -{" "}
            {parte.finalizacion
              ? new Date(parte.finalizacion).toLocaleDateString("es-AR")
              : "No definido"}
          </p>
          <p><strong>Observaciones:</strong> {parte.observaciones}</p>
        </div>
      ))
    ) : (
      <p>No hay Parte de Enfermo registrados.</p>
    )}
  </div>
</div>


{/* Aptitud Psicofísica */}
<div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
  <h3 className="text-lg font-semibold text-gray-700 mb-2">Aptitud Psicofísica</h3>
    {user.aptitudPsicofisica.length > 0 ? (
      user.aptitudPsicofisica.map((aptitud, index) => (
        <div key={index} >
           <p><strong>Estado:</strong> {aptitud.estado}</p>
          <p><strong>Observaciones:</strong> {aptitud.observacion}</p>
        </div>
      ))
    ) : (
      <p>No hay Aptitud Psicofísica registrada.</p>
    )}
</div>






        {/* Junta medica*/}
                
                    <div className="p-4 rounded-lg mb-4 bg-blue-50 border border-blue-200">
  <h3 className="text-lg font-semibold text-gray-700 mb-2">Junta Médica</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
    {user.juntaMedica.length > 0 ? (
      user.juntaMedica.map((junta, index) => (
        <div key={index} className="border p-5 rounded bg-white">
          <p><strong>Mensaje Aeronáutico:</strong> {junta.mensaje}</p>
          <p><strong>Turnos:</strong>{" "}{junta.turnos? new Date(junta.turnos).toLocaleDateString("es-AR"): "No definido"}</p>

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

  )
}

export default UserDetail