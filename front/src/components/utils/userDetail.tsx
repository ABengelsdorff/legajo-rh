import React from "react";
import { IUser } from "@/components/interfaces/interfaces";

interface Props {
  user: IUser;
}

const UserDetail: React.FC<Props> = ({ user }) => {
  return (
    <div className="space-y-6 justify-center items-center p-4 rounded-lg mb-4 max-w-screen-md mx-auto">
      {/* Información Personal */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 max-w-screen-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Información Personal
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <p>
            <strong>Nombre Completo:</strong> {user.nombre} {user.apellido}
          </p>
          <p>
            <strong>Sexo:</strong> {user.sexo}
          </p>
          <p>
            <strong>Fecha de Nacimiento:</strong>{" "}
            {user.fechaDeNacimiento
              ? new Date(user.fechaDeNacimiento).toLocaleDateString("es-AR")
              : "No definida"}
          </p>
          <p>
            <strong>Correo Electrónico:</strong> {user.correoElectronico}
          </p>
          <p>
            <strong>Codigo Postal:</strong> {user.codigoPostal}
          </p>

          <p>
            <strong>Telefono:</strong> {user.telefono}
          </p>
          <p>
            <strong>DNI:</strong> {user.numeroDeDni}
          </p>
          <p>
            <strong>CUIL:</strong> {user.numeroDeCuil}
          </p>
          <p>
            <strong>Dirección:</strong> {user.direccion}
          </p>
          <p>
            <strong>Estado Civil</strong> {user.estadoCivil}
          </p>
        </div>
      </div>

      {/* Información Profesional */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 max-w-screen-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Información Profesional
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <p>
            <strong>Activo:</strong> {user.activo}
          </p>

          <p>
            <strong>Cargo:</strong> {user.cargo}
          </p>
          <p>
            <strong>Formación Académica:</strong> {user.formacionAcademica}
          </p>
          <p>
            <strong>Fecha de Ingreso:</strong>{" "}
            {user.fechaIngreso
              ? new Date(user.fechaIngreso).toLocaleDateString("es-AR")
              : "No definida"}
          </p>
          <p>
            <strong>Nivel de Inglés:</strong> {user.nivelDeIngles}%
          </p>
          <p>
            <strong>Especialidad:</strong> {user.especialidad}
          </p>
          <p>
            <strong>Departamento</strong> {user.departamento}
          </p>
        </div>
      </div>

      {/* Cursos Realizados */}
      <div className="p-4 rounded-lg mb-4 bg-blue-50 border border-blue-200 max-w-screen-md">
        <h3 className="font-semibold">Cursos Realizados</h3>
        <ul className="list-disc list-inside">
          {user.cursosRealizados.length > 0 ? (
            user.cursosRealizados.map((curso, index) => (
              <li key={curso.id || index}>
                {curso.nombre} - {curso.institucion} -{" "}
                {curso.fechaFinalizacion
                  ? typeof curso.fechaFinalizacion === "string"
                    ? curso.fechaFinalizacion
                    : new Date(curso.fechaFinalizacion).toLocaleDateString(
                        "es-AR"
                      )
                  : "Sin fecha"}
              </li>
            ))
          ) : (
            <li>No hay datos de Cursos Realizados</li>
          )}
        </ul>
      </div>

      {/* Grupo Familiar */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 max-w-screen-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Grupo Familiar
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
          {user.grupoFamiliar.length > 0 ? (
            user.grupoFamiliar.map((familiar, index) => (
              <div key={index} className="border p-5 rounded bg-white">
                <p>
                  <strong>Nombre:</strong> {familiar.nombre}
                </p>
                <p>
                  <strong>Apellido:</strong> {familiar.apellido}
                </p>
                <p>
                  <strong>DNI:</strong> {familiar.dni}
                </p>
                <p>
                  <strong>Parentesco:</strong> {familiar.parentesco}
                </p>
                <p>
                  <strong>Fecha de Nacimiento:</strong>{" "}
                  {familiar.fechaNacimiento
                    ? new Date(familiar.fechaNacimiento).toLocaleDateString(
                        "es-AR"
                      )
                    : "No definida"}
                </p>
                <p>
                  <strong>Observaciones:</strong> {familiar.observaciones}
                </p>
              </div>
            ))
          ) : (
            <p>No hay datos de Grupo Familiar.</p>
          )}
        </div>
      </div>

      {/* Evaluacion medica*/}

      <div className="p-4 rounded-lg mb-4 bg-blue-50 border border-blue-200 max-w-screen-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Evaluación Médica
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
          {user.evaluacionesMedicas.length > 0 ? (
            user.evaluacionesMedicas.map((evaluacion, index) => (
              <div key={index} className="border p-5 rounded bg-white">
                <p>
                  <strong>Fecha:</strong>{" "}
                  {evaluacion.fecha
                    ? new Date(evaluacion.fecha).toLocaleDateString("es-AR")
                    : "No definida"}
                </p>
                <p>
                  <strong>Resultado:</strong> {evaluacion.resultado}
                </p>

                <p>
                  <strong>Observaciones:</strong> {evaluacion.observacion}
                </p>
                <p>
                  <strong>Profesional:</strong> {evaluacion.profesional}
                </p>
              </div>
            ))
          ) : (
            <p>No hay registros de Evaluacion Médica.</p>
          )}
        </div>
      </div>

      {/* Licencias */}
      <div className="p-4 rounded-lg mb-4 bg-blue-50 border border-blue-200 max-w-screen-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Licencias</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
          {user.licencias.length > 0 ? (
            user.licencias.map((licencia, index) => (
              <div key={index} className="border p-5 rounded bg-white">
                <p>
                  <strong>Tipo:</strong> {licencia.tipo}
                </p>
                <p>
                  <strong>Desde:</strong>{" "}
                  {licencia.desde
                    ? new Date(licencia.desde).toLocaleDateString("es-AR")
                    : "No definido"}
                </p>
                <p>
                  <strong>Hasta:</strong>{" "}
                  {licencia.hasta
                    ? new Date(licencia.hasta).toLocaleDateString("es-AR")
                    : "No definido"}
                </p>
                <p>
                  <strong>Observaciones:</strong> {licencia.observaciones}
                </p>
              </div>
            ))
          ) : (
            <p>No hay registros de Licencias.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
