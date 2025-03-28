"use client";

import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/userServices";
import { IUser } from "@/components/interfaces/interfaces";

const UserList = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data: IUser[] = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

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
                Lista de Usuarios
              </h1>
            </div>

            {users.length === 0 ? (
              <p className="text-center text-gray-600">Cargando usuarios...</p>
            ) : (
              users.map((user) => (
                <div
                  key={user.id}
                  className="bg-white p-6 rounded-lg shadow-md mb-8"
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {user.nombre} {user.apellido}
                  </h2>

                  {/* Información Personal */}
                  <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg mb-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Información Personal
                    </h3>
                    <div className="grid grid-cols-4 gap-4 text-black">
                      <p>
                        <strong>Sexo:</strong> {user.sexo}
                      </p>
                      <p>
                        <strong>Fecha de Nacimiento:</strong>{" "}
                        {user.fechaDeNacimiento
                          ? new Date(user.fechaDeNacimiento).toLocaleDateString(
                              "es-AR"
                            )
                          : "No definida"}
                      </p>
                      <p>
                        <strong>Grupo Sanguíneo:</strong> {user.grupoSanguineo}
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
                        <strong>Código Postal:</strong> {user.codigoPostal}
                      </p>
                      <p>
                        <strong>Correo Electrónico:</strong>{" "}
                        {user.correoElectronico}
                      </p>
                      <p>
                        <strong>Usuario GDE:</strong> {user.usuarioGde}
                      </p>
                      <p>
                        <strong>CBU:</strong> {user.cbu}
                      </p>
                      <p>
                        <strong>Celular:</strong> {user.numeroDeCelular}
                      </p>
                      <p>
                        <strong>Formación:</strong> {user.formacionAcademica}
                      </p>

                      <p>
                        <strong>Estado Civil:</strong> {user.estadoCivil}
                      </p>
                    </div>
                  </div>

                  {/* Información Profesional */}
                  <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg mb-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Información Profesional
                    </h3>
                    <div className="grid grid-cols-4 gap-4 text-black">
                      <p>
                        <strong>Destinado en la Unidad:</strong>{" "}
                        {user.destinadoEnLaUnidad}
                      </p>
                      <p>
                        <strong>IOSFA:</strong> {user.numeroDeIosfa}
                      </p>
                      <p>
                        <strong>Instituto:</strong> {user.institutoDeFormacion}
                      </p>
                      <p>
                        <strong>Escalafón:</strong> {user.escalafon}
                      </p>
                      <p>
                        <strong>Grado:</strong> {user.grado}
                      </p>
                      <p>
                        <strong>Cargo:</strong> {user.cargo}
                      </p>
                      <p>
                        <strong>Destino:</strong> {user.destinoJbGrupos}
                      </p>
                      <p>
                        <strong>Destino Interno:</strong> {user.destinoInterno}
                      </p>
                      <p>
                        <strong>Especialidad:</strong> {user.especialidad}
                      </p>
                      <p>
                        <strong>Esp. Avanzada:</strong>{" "}
                        {user.especialidadAvanzada}
                      </p>
                      <p>
                        <strong>Nivel de Inglés:</strong> {user.nivelDeIngles}%
                      </p>
                      <p>
                        <strong>RTI:</strong> {user.rti}
                      </p>

                      <p>
                        <strong>Cursos:</strong>{" "}
                        {user.cursosRealizados
                          .map((c) => c.nombre)
                          .join(", ") || "-"}
                      </p>
                    </div>
                  </div>

                  {/* Grupo Familiar */}
                  <div className=" p-4 rounded-lg mb-4 bg-blue-50  border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Grupo Familiar
                    </h3>
                    {user.grupoFamiliar.length > 0 ? (
                      <div className=" grid grid-cols-3 gap-4 text-black ">
                        {user.grupoFamiliar.map((familiar, index) => (
                          <div
                            key={index}
                            className="border p-5 rounded bg-white"
                          >
                            <p>
                              <strong>{familiar.parentesco}:</strong>{" "}
                              {familiar.nombre} {familiar.apellido}
                            </p>
                            <p>
                              <strong>DNI:</strong> {familiar.dni}
                            </p>
                            <p>
                              <strong>Personal Militar:</strong>{" "}
                              {familiar.personalMilitar}
                            </p>
                            {familiar.observaciones && (
                              <p>
                                <strong>Observaciones:</strong>{" "}
                                {familiar.observaciones}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No hay datos familiares.</p>
                    )}
                  </div>

                  {/* Actuaciones */}
                  <div className="p-4 rounded-lg mb-4 bg-blue-50  border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Actuaciones
                    </h3>
                    {user.actuaciones.length > 0 ? (
                      <div className="grid grid-cols-2 gap-4 text-black">
                        {user.actuaciones.map((act, index) => (
                          <div
                            key={index}
                            className="border p-5 rounded bg-white"
                          >
                            <p>
                              <strong>Expediente:</strong>{" "}
                              {act.numeroDeExpediente}
                            </p>
                            <p>
                              <strong>Situación:</strong> {act.afeccion}
                            </p>
                            <p>
                              <strong>Disponibilidad:</strong>{" "}
                              {act.disponibilidad.desde
                                ? new Date(
                                    act.disponibilidad.desde
                                  ).toLocaleDateString("es-AR")
                                : "No definida"}{" "}
                              -{" "}
                              {act.disponibilidad.hasta
                                ? new Date(
                                    act.disponibilidad.hasta
                                  ).toLocaleDateString("es-AR")
                                : "No definida"}
                            </p>
                            <p>
                              <strong>Pasiva:</strong>{" "}
                              {act.pasiva.desde
                                ? new Date(act.pasiva.desde).toLocaleDateString(
                                    "es-AR"
                                  )
                                : "No definida"}{" "}
                              -{" "}
                              {act.pasiva.hasta
                                ? new Date(act.pasiva.hasta).toLocaleDateString(
                                    "es-AR"
                                  )
                                : "No definida"}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No hay actuaciones registradas.</p>
                    )}
                  </div>

                  {/* Junta Médica */}
                  <div className="p-4 rounded-lg mb-4 bg-blue-50  border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Junta Médica
                    </h3>
                    {user.juntaMedica.length > 0 ? (
                      <div className="grid grid-cols-2 gap-4 text-black">
                        {user.juntaMedica.map((junta, index) => (
                          <div
                            key={index}
                            className="border p-5 rounded bg-white"
                          >
                            <p>
                              <strong>Mensaje:</strong> {junta.mensaje}
                            </p>
                            <p>
                              <strong>Turnos:</strong>{" "}
                              {junta.turnos
                                ? new Date(junta.turnos).toLocaleDateString(
                                    "es-AR"
                                  )
                                : "No definido"}
                            </p>
                            <p>
                              <strong>Observación:</strong> {junta.observacion}
                            </p>
                            <p>
                              <strong>Afección:</strong> {junta.afeccion}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No hay registros de Junta Médica.</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
