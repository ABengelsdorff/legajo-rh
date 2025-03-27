"use client";

import React from "react";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { ValidacionLegajo } from "../../components/utils/rulesForm";
import { createUser, updateUser } from "../../services/userServices";
import { IUser } from "../../components/interfaces/interfaces";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check } from "lucide-react";


export default function LegajoProfesional({ initialData, onSave } : { initialData?: IUser, onSave?:(data: IUser) => void}) {
  const [formSuccess, setFormSuccess] = useState(false);
  const [user, setUser] = useState<IUser>(initialData || {
    id: 0,
    nombre: "",
    apellido: "",
    sexo: "",
    fechaDeNacimiento: null,
    grupoSanguineo: "",
    numeroDeDni: "",
    numeroDeCuil: "",
    direccion: "",
    codigoPostal: "",
    correoElectronico: "",
    correoInstitucional: "",
    usuarioGde: "",
    cbu: "",
    numeroDeCelular: "",
    numeroDeIosfa: "",
    rti: "",
    destinoAnterior: "",
    institutoDeFormacion: "",
    grado: "CABO",
    destinadoEnLaUnidad: "",
    destinoJbGrupos: "",
    destinoInterno: "",
    cargo: "",
    escalafon: "",
    especialidad: "",
    especialidadAvanzada: "",
    cursosRealizados: [],
    formacionAcademica: "",
    nivelDeIngles: 0,
    estadoCivil: "",
    grupoFamiliar: [],
    situacionDeRevista: "",
    compromisoDeServicio: "",
    ultimoAscenso: "",
    fotoDeLegajo: "",
    actuaciones: [],
    parteDeEnfermo: [],
    aptitudPsicofisica: [],
    solicitudes: [],
    juntaMedica: [],
  });


  const agregarActuacion = () => {
    setUser((prevUser) => ({
      ...prevUser,
      actuaciones: [
        ...prevUser.actuaciones,
        {
          numeroDeExpediente: "",
          afeccion: "",
          // situacionDeRevista: "SERVICIO EFECTIVO",
          disponibilidad: { desde: undefined, hasta: undefined },
          pasiva: { desde: undefined, hasta: undefined },
        },
      ],
    }));
  };

  const eliminarActuacion = (index: number) => {
    setUser((prevUser) => ({
      ...prevUser,
      actuaciones: prevUser.actuaciones.filter((_, i) => i !== index),
    }));
  };

  const addFamilyMember = () => {
    setUser((prevUser) => ({
      ...prevUser,
      grupoFamiliar: [
        ...prevUser.grupoFamiliar,
        {
          parentesco: "",
          nombre: "",
          apellido: "",
          dni: "",
          personalMilitar: "",
          observaciones: "",
        },
      ],
    }));
  };

  const removeFamilyMember = (index: number) => {
    const updatedFamily = user.grupoFamiliar.filter((_, i) => i !== index);
    setUser((prevUser) => ({
      ...prevUser,
      grupoFamiliar: updatedFamily,
    }));
  };

  const addCourse = () => {
    setUser({ ...user, cursosRealizados: [...user.cursosRealizados, ""] });
  };

  const removeCourse = (index: number) => {
    const updatedCourses = user.cursosRealizados.filter((_, i) => i !== index);
    setUser({ ...user, cursosRealizados: updatedCourses });
  };

  const agregarJuntaMedica = () => {
    setUser((prevUser) => ({
      ...prevUser,
      juntaMedica: [
        ...prevUser.juntaMedica,
        {
          mensaje: "",
          turnos: null,
          observacion: "",
          afeccion: "",
        },
      ],
    }));
  };

  const eliminarJuntaMedica = (index: number) => {
    setUser((prevUser) => ({
      ...prevUser,
      juntaMedica: prevUser.juntaMedica.filter((_, i) => i !== index),
    }));
  };

  const agregarParteDeEnfermo = () => {
    setUser((prevUser) => ({
      ...prevUser,
      parteDeEnfermo: [
        ...(prevUser.parteDeEnfermo || []),
        { inicio: undefined, finalizacion: undefined, observaciones: "" },
      ],
    }));
  };

  const eliminarParteDeEnfermo = (index: number) => {
    setUser((prevUser) => ({
      ...prevUser,
      parteDeEnfermo: prevUser.parteDeEnfermo.filter((_, i) => i !== index),
    }));
  };

  const agregarAptitudPsicofisica = () => {
    setUser((prevUser) => ({
      ...prevUser,
      aptitudPsicofisica: [
        ...prevUser.aptitudPsicofisica,
        { estado: "", observacion: "" },
      ],
    }));
  };

  const eliminarAptitudPsicofisica = (index: number) => {
    setUser((prevUser) => ({
      ...prevUser,
      aptitudPsicofisica: prevUser.aptitudPsicofisica.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const agregarSolicitud = () => {
    setUser((prevUser) => ({
      ...prevUser,
      solicitudes: [
        ...prevUser.solicitudes,
        {
          numeroDeExpediente: "",
          solicitud: { desde: "", hasta: "" },
          observaciones: "",
        },
      ],
    }));
  };

  const eliminarSolicitud = (index: number) => {
    setUser((prevUser) => ({
      ...prevUser,
      solicitudes: prevUser.solicitudes.filter((_, i) => i !== index),
    }));
  };

  const { control, handleSubmit, reset, getValues, formState: { errors }, } = useForm<IUser>({
    mode: "onChange",
    defaultValues: initialData || user,
  });

  useEffect(() => {
    if (initialData) {
      setUser(initialData);
      reset(initialData);
    }
  }, [initialData, reset]);


  // const onSubmit = async (data: IUser) => {
  //   try {
  //     if (user.id === 0){
  //       console.log(data);
  //       await createUser(data);
  //     }else {
  //       await updateUser(user.id, data)
  //     }
  //     reset();

  //     setFormSuccess(true);
  //     setTimeout(() => setFormSuccess(false), 3000);
  //   } catch (error) {
  //     console.error(
  //       "Error en la creación del usuario o en la obtención de usuarios:",
  //       error
  //     );
  //   }
  // };

  const onSubmit = async (data: IUser) => {
    try {
      let savedUser;
  
      if (user.id === 0) {
        savedUser = await createUser(data);
      } else {
        savedUser = await updateUser(user.id, data);
      }
  
      reset(data);
  
      // Mostrar éxito local (opcional)
      setFormSuccess(true);
      setTimeout(() => setFormSuccess(false), 3000);
  
      // 🔁 Llamar a la función onSave si fue pasada como prop
      if (onSave) {
        onSave(savedUser); // <<<<< ✅ Devuelve el usuario actualizado
      }
  
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
    }
  };
  

  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12 bg-slate-800">
      <div className="relative py-3 sm:max-w-3xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-stone-100 shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-4xl mx-auto">
           
           
          <Dialog open={formSuccess} onOpenChange={setFormSuccess}>
  <DialogContent className="max-w-md p-0 overflow-hidden border-none shadow-lg bg-transparent">
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-3xl"></div>

      <div className="relative bg-stone-100 shadow-lg rounded-3xl p-8">
        <div className="flex flex-col items-center">
          <div className="mx-auto my-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
            <Check className="h-12 w-12 text-blue-600" strokeWidth={3} />
          </div>

          <DialogHeader className="pb-2">
            <DialogTitle className="text-3xl font-extrabold text-gray-900 text-center">
            Formulario enviado con éxito
            </DialogTitle>
          </DialogHeader>

          <p className="text-gray-600 mt-2 mb-6 text-center">
            El formulario fue enviado correctamente.
          </p>
        </div>
      </div>
    </div>
  </DialogContent>
</Dialog>


            <div className="flex justify-center mb-8">
              <img
                src="/septima.jpg"
                alt="Logo Fuerza Aérea Argentina"
                width={180}
                height={180}
                className="drop-shadow-xl"
              />
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
                Legajo Profesional
              </h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Información Personal
                  </h2>
                  <div className="space-y-4">
                    <Controller
                      name="nombre"
                      control={control}
                      rules={ValidacionLegajo.nombre}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="nombre"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Nombre
                          </label>
                          <input
                            {...field}
                            type="text"
                            id="nombre"
                            value={field.value || ""}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.nombre && (
                      <span className="text-red-600">
                        {errors.nombre.message}
                      </span>
                    )}

                    <Controller
                      name="apellido"
                      control={control}
                      rules={ValidacionLegajo.apellido}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="apellido"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Apellido
                          </label>
                          <input
                            {...field}
                            type="text"
                            id="apellido"
                            value={field.value || ""}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.apellido && (
                      <span className="text-red-600">
                        {errors.apellido.message}
                      </span>
                    )}

                    <Controller
                      name="sexo"
                      control={control}
                      rules={ValidacionLegajo.sexo}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="sexo"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Sexo
                          </label>
                          <select
                            {...field}
                            id="sexo"
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          >
                            <option value="">Seleccionar...</option>
                            <option value="MASCULINO">MASCULINO</option>
                            <option value="FEMENINO">FEMENINO</option>
                          </select>
                        </div>
                      )}
                    />
                    {errors.sexo && (
                      <span className="text-red-600">
                        {errors.sexo.message}
                      </span>
                    )}

                    <Controller
                      name="fechaDeNacimiento"
                      control={control}
                      rules={ValidacionLegajo.fechadeNacimiento}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="fechaDeNacimiento"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Fecha de Nacimiento
                          </label>
                          <input
                            {...field} // Esta línea permite que React Hook Form maneje el valor
                            type="date"
                            id="fechaDeNacimiento"
                            value={
                              field.value
                                ? typeof field.value === "string"
                                ? field.value 
                                : field.value.toISOString().split("T")[0]
                                : ""
                            } // Asegúrate de convertir la fecha a formato de cadena para el input
                            onChange={(e) =>
                              field.onChange(
                                e.target.value ? new Date(e.target.value) : null
                              )
                            } // Actualiza el valor correctamente
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.fechaDeNacimiento && (
                      <span className="text-red-600">
                        {errors.fechaDeNacimiento.message}
                      </span>
                    )}

                    <Controller
                      name="numeroDeDni"
                      control={control}
                      rules={ValidacionLegajo.numeroDeDni}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="numeroDeDni"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Número de DNI
                          </label>
                          <input
                            {...field}
                            type="text"
                            id="numeroDeDni"
                            value={field.value || ""}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.numeroDeDni && (
                      <span className="text-red-600">
                        {errors.numeroDeDni.message}
                      </span>
                    )}

                    <Controller
                      name="numeroDeCuil"
                      control={control}
                      rules={ValidacionLegajo.numeroDeCuil}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="numeroDeCuil"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Número de CUIL
                          </label>
                          <input
                            {...field}
                            type="text"
                            id="numeroDeCuil"
                            value={field.value || ""}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.numeroDeCuil && (
                      <span className="text-red-600">
                        {errors.numeroDeCuil.message}
                      </span>
                    )}

                    <Controller
                      name="grupoSanguineo"
                      control={control}
                      rules={ValidacionLegajo.grupoSanguineo}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="grupoSanguineo"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Grupo Sanguíneo
                          </label>
                          <input
                            {...field}
                            type="text"
                            id="grupoSanguineo"
                            value={field.value || ""}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.grupoSanguineo && (
                      <span className="text-red-600">
                        {errors.grupoSanguineo.message}
                      </span>
                    )}

                    <Controller
                      name="direccion"
                      control={control}
                      rules={ValidacionLegajo.direccion}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="direccion"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Dirección
                          </label>
                          <input
                            {...field}
                            type="text"
                            id="direccion"
                            value={field.value || ""}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.direccion && (
                      <span className="text-red-600">
                        {errors.direccion.message}
                      </span>
                    )}

                    <Controller
                      name="codigoPostal"
                      control={control}
                      rules={ValidacionLegajo.codigoPostal}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="codigoPostal"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Código Postal
                          </label>
                          <input
                            {...field}
                            type="text"
                            id="codigoPostal"
                            value={field.value || ""}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.codigoPostal && (
                      <span className="text-red-600">
                        {errors.codigoPostal.message}
                      </span>
                    )}

                    <Controller
                      name="correoElectronico"
                      control={control}
                      rules={ValidacionLegajo.correoElectronico}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="correoElectronico"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Correo Electrónico
                          </label>
                          <input
                            {...field}
                            type="email"
                            id="correoElectronico"
                            value={field.value || ""}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.correoElectronico && (
                      <span className="text-red-600">
                        {errors.correoElectronico.message}
                      </span>
                    )}

                    <Controller
                      name="cbu"
                      control={control}
                      rules={ValidacionLegajo.cbu}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="cbu"
                            className="block text-sm font-medium text-gray-900"
                          >
                            CBU
                          </label>
                          <input
                            {...field}
                            type="text"
                            id="cbu"
                            value={field.value || ""}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.cbu && (
                      <span className="text-red-600">{errors.cbu.message}</span>
                    )}

                    <Controller
                      name="numeroDeCelular"
                      control={control}
                      rules={ValidacionLegajo.numeroDeCelular}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="numeroDeCelular"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Número de Celular
                          </label>
                          <input
                            {...field}
                            type="text"
                            id="numeroDeCelular"
                            value={field.value || ""}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.numeroDeCelular && (
                      <span className="text-red-600">
                        {errors.numeroDeCelular.message}
                      </span>
                    )}

                    <Controller
                      name="formacionAcademica"
                      control={control}
                      rules={ValidacionLegajo.formacionAcademica}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="formacionAcademica"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Formación Académica
                          </label>
                          <select
                            {...field}
                            id="formacionAcademica"
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          >
                            <option value="">Seleccionar...</option>
                            <option value="SECUNDARIO INCOMPLETO">
                              SECUNDARIO INCOMPLETO
                            </option>
                            <option value="SECUNDARIO COMPLETO">
                              SECUNDARIO COMPLETO
                            </option>
                            <option value="TERCIARIO INCOMPLETO">
                              TERCIARIO INCOMPLETO
                            </option>
                            <option value="TERCIARIO COMPLETO">
                              TERCIARIO COMPLETO
                            </option>
                            <option value="UNIVERSITARIO INCOMPLETO">
                              UNIVERSITARIO INCOMPLETO
                            </option>
                            <option value="UNIVERSITARIO COMPLETO">
                              UNIVERSITARIO COMPLETO
                            </option>
                          </select>
                        </div>
                      )}
                    />
                    {errors.formacionAcademica && (
                      <span className="text-red-600">
                        {errors.formacionAcademica.message}
                      </span>
                    )}

                    <Controller
                      name="estadoCivil"
                      control={control}
                      rules={ValidacionLegajo.estadoCivil}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="estadoCivil"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Estado Civil
                          </label>
                          <select
                            {...field}
                            id="estadoCivil"
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          >
                            <option value="">Seleccionar...</option>
                            <option value="SOLTERO">SOLTERO</option>
                            <option value="CASADO">CASADO</option>
                            <option value="CONCUBINATO">CONCUBINATO</option>
                            <option value="DIVORCIADO">DIVORCIADO</option>
                            <option value="VIUDO">VIUDO</option>
                          </select>
                        </div>
                      )}
                    />
                    {errors.estadoCivil && (
                      <span className="text-red-600">
                        {errors.estadoCivil.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Información Profesional */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Información Profesional
                  </h2>
                  <div className="space-y-4">
                    <Controller
                      name="destinadoEnLaUnidad"
                      control={control}
                      rules={ValidacionLegajo.destinadoEnLaUnidad}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="destinadoEnLaUnidad"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Destinado en la Unidad
                          </label>
                          <select
                            {...field}
                            id="destinadoEnLaUnidad"
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          >
                            <option value="">Seleccionar...</option>
                            <option value="SI">SÍ</option>
                            <option value="NO">NO</option>
                          </select>
                        </div>
                      )}
                    />
                    {errors.destinadoEnLaUnidad && (
                      <span className="text-red-600">
                        {errors.destinadoEnLaUnidad.message}
                      </span>
                    )}

                    <Controller
                      name="numeroDeIosfa"
                      control={control}
                      rules={ValidacionLegajo.numeroDeIosfa}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="numeroDeIosfa"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Número de IOSFA
                          </label>
                          <input
                            {...field}
                            id="numeroDeIosfa"
                            type="text"
                            value={field.value || ""}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.numeroDeIosfa && (
                      <span className="text-red-600">
                        {errors.numeroDeIosfa.message}
                      </span>
                    )}

                    <Controller
                      name="institutoDeFormacion"
                      control={control}
                      rules={ValidacionLegajo.institutoDeFormacion}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="institutoDeFormacion"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Instituto de Formación
                          </label>
                          <select
                            {...field}
                            id="institutoDeFormacion"
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          >
                            <option value="">Seleccionar...</option>
                            <option value="BAME">BAME</option>
                            <option value="CUPROSO">CUPROSO</option>
                            <option value="CUSERPRO">CUSERPRO</option>
                            <option value="EAM">EAM</option>
                            <option value="ESFA">ESFA</option>
                            <option value="ESFAC">ESFAC</option>
                            <option value="ESFAE">ESFAE</option>
                            <option value="IFE">IFE</option>
                            <option value="INCORPORACION TROPA">
                              INCORPORACION TROPA
                            </option>
                          </select>
                        </div>
                      )}
                    />
                    {errors.institutoDeFormacion && (
                      <span className="text-red-600">
                        {errors.institutoDeFormacion.message}
                      </span>
                    )}

                    <Controller
                      name="escalafon"
                      control={control}
                      rules={ValidacionLegajo.escalafon}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="escalafon"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Escalafón
                          </label>
                          <input
                            {...field}
                            id="escalafon"
                            value={field.value || ""}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          ></input>
                        </div>
                      )}
                    />
                    {errors.escalafon && (
                      <span className="text-red-600">
                        {errors.escalafon.message}
                      </span>
                    )}

                    <Controller
                      name="grado"
                      control={control}
                      rules={ValidacionLegajo.grado}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="grado"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Grado
                          </label>
                          <select
                            {...field}
                            id="grado"
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          >
                            <option value="">Seleccionar...</option>
                            <option value="CABO">CABO</option>
                            <option value="CABO PRIMERO">CABO PRIMERO</option>
                            <option value="CABO PRINCIPAL">
                              CABO PRINCIPAL
                            </option>
                            <option value="SUBOFICIAL AUXILIAR">
                              SUBOFICIAL AUXILIAR
                            </option>
                            <option value="SUBOFICIAL AYUDANTE">
                              SUBOFICIAL AYUDANTE
                            </option>
                            <option value="SUBOFICIAL PRINCIPAL">
                              SUBOFICIAL PRINCIPAL
                            </option>
                            <option value="SUBOFICIAL MAYOR">
                              SUBOFICIAL MAYOR
                            </option>
                          </select>
                        </div>
                      )}
                    />
                    {errors.grado && (
                      <span className="text-red-600">
                        {errors.grado.message}
                      </span>
                    )}

                    <Controller
                      name="destinoJbGrupos"
                      control={control}
                      rules={ValidacionLegajo.destinoJbGrupos}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="destinoJbGrupos"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Destino JB Grupos
                          </label>
                          <select
                            {...field}
                            id="destinoJbGrupos"
                            multiple={false}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          >
                            <option value="">Seleccionar...</option>
                            <option value="JEFATURA">JEFATURA</option>
                            <option value="GRUPO BASE">GRUPO BASE</option>
                            <option value="GRUPO TECNICO">GRUPO TECNICO</option>
                            <option value="GRUPO AEREO">GRUPO AEREO</option>
                          </select>
                        </div>
                      )}
                    />
                    {errors.destinoJbGrupos && (
                      <span className="text-red-600">
                        {errors.destinoJbGrupos.message}
                      </span>
                    )}

                    <Controller
                      name="destinoInterno"
                      control={control}
                      rules={ValidacionLegajo.destinoInterno}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="destinoInterno"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Destino Interno
                          </label>
                          <input
                            {...field}
                            type="text"
                            id="destinoInterno"
                            value={field.value || ""}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.destinoInterno && (
                      <span className="text-red-600">
                        {errors.destinoInterno.message}
                      </span>
                    )}

                    <Controller
                      name="cargo"
                      control={control}
                      rules={ValidacionLegajo.cargo}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="cargo"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Cargo
                          </label>
                          <select
                            {...field}
                            id="cargo"
                            multiple={false}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          >
                            <option value="">Seleccionar...</option>
                            <option value="ENCARGADO">ENCARGADO</option>
                            <option value="AUXILIAR">AUXILIAR</option>
                          </select>
                        </div>
                      )}
                    />
                    {errors.cargo && (
                      <span className="text-red-600">
                        {errors.cargo.message}
                      </span>
                    )}

                    <Controller
                      name="especialidad"
                      control={control}
                      rules={ValidacionLegajo.especialidad}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="especialidad"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Especialidad
                          </label>
                          <input
                            {...field}
                            type="text"
                            value={field.value || ""}
                            id="especialidad"
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.especialidad && (
                      <span className="text-red-600">
                        {errors.especialidad.message}
                      </span>
                    )}

                    <Controller
                      name="especialidadAvanzada"
                      control={control}
                      rules={ValidacionLegajo.especialidadAvanzada}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="especialidadAvanzada"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Especialidad Avanzada
                          </label>
                          <input
                            {...field}
                            type="text"
                            value={field.value || ""}
                            id="especialidadAvanzada"
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.especialidadAvanzada && (
                      <span className="text-red-600">
                        {errors.especialidadAvanzada.message}
                      </span>
                    )}

                    <Controller
                      name="nivelDeIngles"
                      control={control}
                      rules={ValidacionLegajo.nivelDeIngles}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="nivelDeIngles"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Nivel de Inglés
                          </label>
                          <div className="flex items-center">
                            <input
                              {...field}
                              type="range"
                              id="nivelDeIngles"
                              value={field.value || ""}
                              min="0"
                              max="100"
                              step="5"
                              className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                            <span className="ml-2 text-sm text-gray-600">
                              {field.value ?? 0}%
                            </span>
                          </div>
                        </div>
                      )}
                    />
                    {errors.nivelDeIngles && (
                      <span className="text-red-600">
                        {errors.nivelDeIngles.message}
                      </span>
                    )}

                    <Controller
                      name="rti"
                      control={control}
                      rules={ValidacionLegajo.rti}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="rti"
                            className="block text-sm font-medium text-gray-900"
                          >
                            RTI
                          </label>
                          <input
                            {...field}
                            type="text"
                            value={field.value || ""}
                            id="rti"
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.rti && (
                      <span className="text-red-600">{errors.rti.message}</span>
                    )}

                    <Controller
                      name="destinoAnterior"
                      control={control}
                      rules={ValidacionLegajo.destinoAnterior}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="destinoAnterior"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Destino Anterior
                          </label>
                          <input
                            {...field}
                            type="text"
                            value={field.value || ""}
                            id="destinoAnterior"
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.destinoAnterior && (
                      <span className="text-red-600 ">
                        {errors.destinoAnterior.message}
                      </span>
                    )}

                    <Controller
                      name="correoInstitucional"
                      control={control}
                      rules={ValidacionLegajo.correoInstitucional}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="correoInstitucional"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Correo Institucional
                          </label>
                          <input
                            {...field}
                            type="email"
                            id="correoInstitucional"
                            value={field.value || ""}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.correoInstitucional && (
                      <span className="text-red-600">
                        {errors.correoInstitucional.message}
                      </span>
                    )}

                    <Controller
                      name="usuarioGde"
                      control={control}
                      rules={ValidacionLegajo.usuarioGde}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="usuarioGde"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Usuario GDE
                          </label>
                          <input
                            {...field}
                            type="text"
                            value={field.value || ""}
                            id="usuarioGde"
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.usuarioGde && (
                      <span className="text-red-600">
                        {errors.usuarioGde.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* //!Cursos */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md mt-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Cursos
                </h2>
                <div className="space-y-4">
                  {user.cursosRealizados.map((curso, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <Controller
                        name={`cursosRealizados.${index}`}
                        control={control}
                        rules={ValidacionLegajo.cursosRealizados}
                        render={({ field }) => (
                          <input
                            {...field}
                            value={field.value ?? ""}
                            type="text"
                            id={`curso-${index}`}
                            className="text-gray-900 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        )}
                      />
                      {errors.cursosRealizados?.[index] && (
                        <span className="text-red-600">
                          {errors.cursosRealizados[index].message}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => removeCourse(index)}
                        className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addCourse}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Agregar Curso
                  </button>
                </div>
              </div>

              {/* //!Grupo Familiar */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Grupo Familiar
                </h2>
                {user.grupoFamiliar.map((familiar, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 gap-6 mb-4 p-4 bg-white rounded-lg"
                  >
                    {/* Columna Izquierda */}
                    <div className="space-y-4">
                      <Controller
                        name={`grupoFamiliar.${index}.nombre`}
                        control={control}
                        rules={ValidacionLegajo.nombre}
                        render={({ field }) => (
                          <div>
                            <label
                              htmlFor={`familiar-nombre-${index}`}
                              className="block text-sm font-medium text-gray-900"
                            >
                              Nombre
                            </label>
                            <input
                              {...field}
                              type="text"
                              value={field.value ?? ""}
                              id={`familiar-nombre-${index}`}
                              className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                          </div>
                        )}
                      />
                      {errors.grupoFamiliar?.[index]?.nombre && (
                        <span className="text-red-600">
                          {errors.grupoFamiliar[index].nombre.message}
                        </span>
                      )}

                      <Controller
                        name={`grupoFamiliar.${index}.apellido`}
                        control={control}
                        rules={ValidacionLegajo.apellido}
                        render={({ field }) => (
                          <div>
                            <label
                              htmlFor={`familiar-apellido-${index}`}
                              className="block text-sm font-medium text-gray-900"
                            >
                              Apellido
                            </label>
                            <input
                              {...field}
                              type="text"
                              value={field.value ?? ""}
                              id={`familiar-apellido-${index}`}
                              className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                          </div>
                        )}
                      />
                      {errors.grupoFamiliar?.[index]?.apellido && (
                        <span className="text-red-600">
                          {errors.grupoFamiliar[index].apellido.message}
                        </span>
                      )}

                      <Controller
                        name={`grupoFamiliar.${index}.dni`}
                        control={control}
                        rules={ValidacionLegajo.numeroDeDni}
                        render={({ field }) => (
                          <div>
                            <label
                              htmlFor={`familiar-dni-${index}`}
                              className="block text-sm font-medium text-gray-900"
                            >
                              DNI
                            </label>
                            <input
                              {...field}
                              type="text"
                              value={field.value ?? ""}
                              id={`familiar-dni-${index}`}
                              className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                          </div>
                        )}
                      />
                      {errors.grupoFamiliar?.[index]?.dni && (
                        <span className="text-red-600">
                          {errors.grupoFamiliar[index].dni.message}
                        </span>
                      )}
                    </div>

                    {/* Columna Derecha */}
                    <div className="space-y-4">
                      <Controller
                        name={`grupoFamiliar.${index}.parentesco`}
                        control={control}
                        rules={ValidacionLegajo.parentesco}
                        render={({ field }) => (
                          <div>
                            <label
                              htmlFor={`familiar-parentesco-${index}`}
                              className="block text-sm font-medium text-gray-900"
                            >
                              Parentesco
                            </label>
                            <select
                              {...field}
                              id={`familiar-parentesco-${index}`}
                              className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            >
                              <option value="">Seleccionar...</option>
                              <option value="CONYUGUE">Cónyuge</option>
                              <option value="MADRE">Madre</option>
                              <option value="PADRE">Padre</option>
                              <option value="HIJO">Hijo</option>
                              <option value="HIJA">Hija</option>
                              <option value="OTRO">Otro</option>
                            </select>
                          </div>
                        )}
                      />
                      {errors.grupoFamiliar?.[index]?.parentesco && (
                        <span className="text-red-600">
                          {errors.grupoFamiliar[index].parentesco.message}
                        </span>
                      )}

                      <Controller
                        name={`grupoFamiliar.${index}.personalMilitar`}
                        control={control}
                        rules={ValidacionLegajo.personalMilitar}
                        render={({ field }) => (
                          <div className="relative">
                            <label
                              htmlFor={`familiar-personalMilitar-${index}`}
                              className="block text-sm font-medium text-gray-900"
                            >
                              Personal Militar
                            </label>
                            <select
                              {...field}
                              id={`familiar-personalMilitar-${index}`}
                              className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            >
                              <option value="">Seleccionar...</option>
                              <option value="SI">Sí</option>
                              <option value="NO">No</option>
                            </select>
                          </div>
                        )}
                      />
                      {errors.grupoFamiliar?.[index]?.personalMilitar && (
                        <span className="text-red-600">
                          {errors.grupoFamiliar[index].personalMilitar.message}
                        </span>
                      )}

                      <Controller
                        name={`grupoFamiliar.${index}.observaciones`}
                        control={control}
                        rules={ValidacionLegajo.observaciones}
                        render={({ field }) => (
                          <div>
                            <label
                              htmlFor={`familiar-observaciones-${index}`}
                              className="block text-sm font-medium text-gray-900"
                            >
                              Observaciones
                            </label>
                            <textarea
                              {...field}
                              id={`familiar-observaciones-${index}`}
                              value={field.value ?? ""}
                              className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                          </div>
                        )}
                      />
                      {errors.grupoFamiliar?.[index]?.observaciones && (
                        <span className="text-red-600">
                          {errors.grupoFamiliar[index].observaciones.message}
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => removeFamilyMember(index)}
                        className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFamilyMember}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Agregar Familiar
                </button>
              </div>

              {/* //!Situacion de revista */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md mt-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Situacion de revista
                </h2>
                <div className="space-y-4">
                  <Controller
                    name="situacionDeRevista"
                    control={control}
                    rules={ValidacionLegajo.situacionDeRevista}
                    render={({ field }) => (
                      <div>
                        <select
                          {...field}
                          id="situacionDeRevista"
                          className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        >
                          <option value="">Seleccionar...</option>
                          <option value="SERVICIO EFECTIVO">
                            SERVICIO EFECTIVO
                          </option>
                          <option value="DISPONIBILIDAD">DISPONIBILIDAD</option>
                          <option value="PASIVA">PASIVA</option>
                        </select>
                      </div>
                    )}
                  />
                  {errors.situacionDeRevista && (
                    <span className="text-red-600">
                      {errors.situacionDeRevista.message}
                    </span>
                  )}
                </div>
              </div>

              {/* //!Compromiso de Servicio */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md mt-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Compromiso de Servicio
                </h2>
                <div className="space-y-4">
                  {/* Compromiso */}
                  <Controller
                    name="compromisoDeServicio"
                    control={control}
                    rules={ValidacionLegajo.compromisoDeServicio}
                    render={({ field }) => (
                      <div>
                        <label
                          htmlFor="compromisoDeServicio"
                          className="block text-sm font-medium text-gray-900"
                        >
                          Compromiso de Servicio
                        </label>
                        <select
                          {...field}
                          id="compromisoDeServicio"
                          className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        >
                          <option value="">Seleccionar...</option>
                          <option value="SI">Sí</option>
                          <option value="NO">No</option>
                        </select>
                      </div>
                    )}
                  />
                  {errors.compromisoDeServicio && (
                    <span className="text-red-600">
                      {errors.compromisoDeServicio.message}
                    </span>
                  )}

                  {/* Último Ascenso */}
                  <Controller
                    name="ultimoAscenso"
                    control={control}
                    rules={ValidacionLegajo.ultimoAscenso}
                    render={({ field }) => (
                      <div>
                        <label
                          htmlFor="ultimoAscenso"
                          className="block text-sm font-medium text-gray-900"
                        >
                          Último Ascenso
                        </label>
                        <input
                          {...field}
                          type="date"
                          id="ultimoAscenso"
                          value={
                            field.value
                              ? new Date(field.value)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                      </div>
                    )}
                  />
                  {errors.ultimoAscenso && (
                    <span className="text-red-600">
                      {errors.ultimoAscenso.message}
                    </span>
                  )}

                  {/* Foto de Legajo */}
                  <Controller
                    name="fotoDeLegajo"
                    control={control}
                    rules={ValidacionLegajo.fotoDeLegajo}
                    render={({ field }) => (
                      <div>
                        <label
                          htmlFor="fotoDeLegajo"
                          className="block text-sm font-medium text-gray-900"
                        >
                          Foto de Legajo
                        </label>
                        <select
                          {...field}
                          id="fotoDeLegajo"
                          className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        >
                          <option value="">Seleccionar...</option>
                          <option value="SI">Sí</option>
                          <option value="NO">No</option>
                        </select>
                      </div>
                    )}
                  />
                  {errors.fotoDeLegajo && (
                    <span className="text-red-600">
                      {errors.fotoDeLegajo.message}
                    </span>
                  )}
                </div>
              </div>

              {/* //!Solicitudes */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Solicitudes
                </h2>
                {user.solicitudes.map((solicitud, index) => (
                  <div
                    key={index}
                    className="space-y-4 border p-4 rounded-lg mb-4 bg-white"
                  >
                    <Controller
                      name={`solicitudes.${index}.numeroDeExpediente`}
                      control={control}
                      rules={ValidacionLegajo.solicitudNumeroDeExpediente}
                      render={({ field }) => (
                        <div>
                          <label
                            htmlFor={`numeroDeExpediente-${index}`}
                            className="block text-sm font-medium text-gray-900"
                          >
                            Número de Expediente
                          </label>
                          <input
                            {...field}
                            value={field.value ?? ""}
                            id={`numeroDeExpediente-${index}`}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.solicitudes?.[index]?.numeroDeExpediente && (
                      <span className="text-red-600">
                        {errors.solicitudes[index].numeroDeExpediente.message}
                      </span>
                    )}

                    <Controller
                      name={`solicitudes.${index}.solicitud.desde`}
                      control={control}
                      rules={ValidacionLegajo.solicitudDesde}
                      render={({ field }) => (
                        <div>
                          <label
                            htmlFor={`solicitudesDesde-${index}`}
                            className="block text-sm font-medium text-gray-900"
                          >
                            Solicitud Desde
                          </label>
                          <input
                            {...field}
                            type="date"
                            id={`solicitudesDesde-${index}`}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            } // Convertimos a string 'YYYY-MM-DD'
                          />
                        </div>
                      )}
                    />
                    {errors.solicitudes?.[index]?.solicitud?.desde && (
                      <span className="text-red-600">
                        {errors.solicitudes[index].solicitud.desde?.message}
                      </span>
                    )}

                    <Controller
                      name={`solicitudes.${index}.observaciones`}
                      control={control}
                      rules={ValidacionLegajo.solicitudObservaciones}
                      render={({ field }) => (
                        <div>
                          <label
                            htmlFor={`solicitudes-observaciones-${index}`}
                            className="block text-sm font-medium text-gray-900"
                          >
                            Observaciones
                          </label>
                          <textarea
                            {...field}
                            id={`solicitudes-observaciones-${index}`}
                            value={field.value ?? ""}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.solicitudes?.[index]?.observaciones && (
                      <span className="text-red-600">
                        {errors.solicitudes[index].observaciones.message}
                      </span>
                    )}

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => eliminarSolicitud(index)}
                        className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={agregarSolicitud}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Agregar Solicitud
                </button>
              </div>

              {/* //!Actuaciones */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Actuaciones por Enfermedad
                </h2>
                {user.actuaciones.map((actuacion, index) => (
                  <div
                    key={index}
                    className="space-y-4 border p-4 rounded-lg mb-4 bg-white"
                  >
                    <Controller
                      name={`actuaciones.${index}.numeroDeExpediente`}
                      control={control}
                      rules={ValidacionLegajo.numeroDeExpediente}
                      render={({ field }) => (
                        <div>
                          <label
                            htmlFor={`numeroDeExpediente-${index}`}
                            className="block text-sm font-medium text-gray-900"
                          >
                            Número de Expediente
                          </label>
                          <input
                            {...field}
                            id={`numeroDeExpediente-${index}`}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.actuaciones?.[index]?.numeroDeExpediente && (
                      <span className="text-red-600">
                        {errors.actuaciones[index].numeroDeExpediente.message}
                      </span>
                    )}

                    {/* //!Ver */}
                    <Controller
                      name={`actuaciones.${index}.afeccion`}
                      control={control}
                      rules={ValidacionLegajo.afeccion}
                      render={({ field }) => (
                        <div>
                          <label
                            htmlFor={`afeccion-${index}`}
                            className="block text-sm font-medium text-gray-900"
                          >
                            Afeccion
                          </label>
                          <textarea
                            {...field}
                            id={`actuaciones-${index}`}
                            value={field.value ?? ""}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.actuaciones?.[index]?.afeccion && (
                      <span className="text-red-600">
                        {errors.actuaciones[index].afeccion.message}
                      </span>
                    )}

                    <Controller
                      name={`actuaciones.${index}.disponibilidad.desde`}
                      control={control}
                      rules={ValidacionLegajo.disponibilidadDesde}
                      render={({ field }) => (
                        <div>
                          <label
                            htmlFor={`disponibilidadDesde-${index}`}
                            className="block text-sm font-medium text-gray-900"
                          >
                            Disponibilidad Desde
                          </label>
                          <input
                            {...field}
                            type="date"
                            id={`disponibilidadDesde-${index}`}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            } // Convertimos a string 'YYYY-MM-DD'
                          />
                        </div>
                      )}
                    />
                    {errors.actuaciones?.[index]?.disponibilidad?.desde && (
                      <span className="text-red-600">
                        {errors.actuaciones[index].disponibilidad.desde.message}
                      </span>
                    )}

                    <Controller
                      name={`actuaciones.${index}.disponibilidad.hasta`}
                      control={control}
                      rules={{
                        ...ValidacionLegajo.disponibilidadHasta,
                        validate: (value) => {
                          const desde = getValues(
                            `actuaciones.${index}.disponibilidad.desde`
                          );
                          if (desde && value) {
                            return (
                              new Date(value) >= new Date(desde) ||
                              "La fecha de finalización debe ser posterior a la de inicio"
                            );
                          }
                          return true; // Si no hay fecha de "desde", no validamos
                        },
                      }}
                      render={({ field }) => (
                        <div>
                          <label
                            htmlFor={`disponibilidadHasta-${index}`}
                            className="block text-sm font-medium text-gray-900"
                          >
                            Disponibilidad Hasta
                          </label>
                          <input
                            {...field}
                            type="date"
                            id={`disponibilidadHasta-${index}`}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }
                          />
                        </div>
                      )}
                    />
                    {errors.actuaciones?.[index]?.disponibilidad?.hasta && (
                      <span className="text-red-600">
                        {errors.actuaciones[index].disponibilidad.hasta.message}
                      </span>
                    )}

                    <Controller
                      name={`actuaciones.${index}.pasiva.desde`}
                      control={control}
                      rules={ValidacionLegajo.pasivaDesde}
                      render={({ field }) => (
                        <div>
                          <label
                            htmlFor={`pasivaDesde-${index}`}
                            className="block text-sm font-medium text-gray-900"
                          >
                            Pasiva Desde
                          </label>
                          <input
                            {...field}
                            type="date"
                            id={`pasivaDesde-${index}`}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }
                          />
                        </div>
                      )}
                    />
                    {errors.actuaciones?.[index]?.pasiva?.desde && (
                      <span className="text-red-600">
                        {errors.actuaciones[index].pasiva.desde.message}
                      </span>
                    )}

                    <Controller
                      name={`actuaciones.${index}.pasiva.hasta`}
                      control={control}
                      rules={{
                        ...ValidacionLegajo.pasivaHasta,
                        validate: (value) => {
                          const desde = getValues(
                            `actuaciones.${index}.pasiva.desde`
                          );
                          if (desde && value) {
                            return (
                              new Date(value) >= new Date(desde) ||
                              "La fecha de finalización debe ser posterior a la de inicio"
                            );
                          }
                          return true; // Si no hay fecha de "desde", no validamos
                        },
                      }}
                      render={({ field }) => (
                        <div>
                          <label
                            htmlFor={`pasivaHasta-${index}`}
                            className="block text-sm font-medium text-gray-900"
                          >
                            Pasiva Hasta
                          </label>
                          <input
                            {...field}
                            type="date"
                            id={`pasivaHasta-${index}`}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }
                          />
                        </div>
                      )}
                    />
                    {errors.actuaciones?.[index]?.pasiva?.hasta && (
                      <span className="text-red-600">
                        {errors.actuaciones[index].pasiva.hasta.message}
                      </span>
                    )}

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => eliminarActuacion(index)}
                        className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={agregarActuacion}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Agregar Actuación
                </button>
              </div>

              {/* //!Parte de Enfermo */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Parte de Enfermo
                </h2>
                {user.parteDeEnfermo?.map((parte, index) => (
                  <div
                    key={index}
                    className="space-y-4 border p-4 rounded-lg mb-4 bg-white"
                  >
                    {/* Inicio */}
                    <Controller
                      name={`parteDeEnfermo.${index}.inicio`}
                      control={control}
                      rules={ValidacionLegajo.inicioParteDeEnfermo}
                      render={({ field }) => (
                        <div>
                          <label
                            htmlFor={`inicio-${index}`}
                            className="block text-sm font-medium text-gray-900"
                          >
                            Inicio
                          </label>
                          <input
                            {...field}
                            type="date"
                            id={`inicio-${index}`}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }
                          />
                        </div>
                      )}
                    />
                    {errors.parteDeEnfermo?.[index]?.inicio && (
                      <span className="text-red-600">
                        {errors.parteDeEnfermo[index].inicio.message}
                      </span>
                    )}

                    {/* Finalización */}
                    <Controller
                      name={`parteDeEnfermo.${index}.finalizacion`}
                      control={control}
                      rules={{
                        ...ValidacionLegajo.finalizacionParteDeEnfermo,
                        validate: (value) => {
                          const inicio = getValues(
                            `parteDeEnfermo.${index}.inicio`
                          );
                          if (inicio && value) {
                            return (
                              new Date(value) >= new Date(inicio) ||
                              "La fecha de finalización debe ser posterior a la de inicio"
                            );
                          }
                          return true;
                        },
                      }}
                      render={({ field }) => (
                        <div>
                          <label
                            htmlFor={`finalizacion-${index}`}
                            className="block text-sm font-medium text-gray-900"
                          >
                            Finalización
                          </label>
                          <input
                            {...field}
                            type="date"
                            id={`finalizacion-${index}`}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }
                          />
                        </div>
                      )}
                    />
                    {errors.parteDeEnfermo?.[index]?.finalizacion && (
                      <span className="text-red-600">
                        {errors.parteDeEnfermo[index].finalizacion.message}
                      </span>
                    )}

                    {/* Observaciones */}
                    <Controller
                      name={`parteDeEnfermo.${index}.observaciones`}
                      control={control}
                      rules={ValidacionLegajo.parteDeEnfermoObservaciones}
                      render={({ field }) => (
                        <div>
                          <label
                            htmlFor={`observaciones-parte-${index}`}
                            className="block text-sm font-medium text-gray-900"
                          >
                            Observaciones
                          </label>
                          <textarea
                            {...field}
                            id={`observaciones-parte-${index}`}
                            value={field.value ?? ""}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.parteDeEnfermo?.[index]?.observaciones && (
                      <span className="text-red-600">
                        {errors.parteDeEnfermo[index].observaciones.message}
                      </span>
                    )}

                    {/* Botón eliminar */}
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => eliminarParteDeEnfermo(index)}
                        className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}

                {/* Botón agregar */}
                <button
                  type="button"
                  onClick={agregarParteDeEnfermo}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Agregar Parte De Enfermo
                </button>
              </div>

              {/* //!Aptitud Psicofísica */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Aptitud Psicofísica
                </h2>
                {user.aptitudPsicofisica?.map((aptitud, index) => (
                  <div
                    key={index}
                    className="space-y-4 border p-4 rounded-lg mb-4 bg-white"
                  >
                    <Controller
                      name={`aptitudPsicofisica.${index}.estado`}
                      control={control}
                      rules={ValidacionLegajo.aptitudPsicofisicaEstado}
                      render={({ field }) => (
                        <div>
                          <label
                            htmlFor={`estado-${index}`}
                            className="block text-sm font-medium text-gray-900"
                          >
                            Estado
                          </label>
                          <input
                            {...field}
                            type="text"
                            value={field.value ?? ""}
                            id={`estado-${index}`}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm
              focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.aptitudPsicofisica?.[index]?.estado && (
                      <span className="text-red-600">
                        {errors.aptitudPsicofisica[index].estado.message}
                      </span>
                    )}

                    <Controller
                      name={`aptitudPsicofisica.${index}.observacion`}
                      control={control}
                      rules={ValidacionLegajo.aptitudPsicofisicaObservaciones}
                      render={({ field }) => (
                        <div>
                          <label
                            htmlFor={`observacion-${index}`}
                            className="block text-sm font-medium text-gray-900"
                          >
                            Observaciones
                          </label>
                          <textarea
                            {...field}
                            id={`observacion-${index}`}
                            value={field.value ?? ""}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm
              focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.aptitudPsicofisica?.[index]?.observacion && (
                      <span className="text-red-600">
                        {errors.aptitudPsicofisica[index].observacion.message}
                      </span>
                    )}

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => eliminarAptitudPsicofisica(index)}
                        className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={agregarAptitudPsicofisica}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Agregar Aptitud Psicofísica
                </button>
              </div>

              {/* //!Junta Médica */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Junta Médica
                </h2>
                {user.juntaMedica.map((junta, index) => (
                  <div
                    key={index}
                    className="space-y-4 border p-4 rounded-lg mb-4 bg-white"
                  >
                    <Controller
                      name={`juntaMedica.${index}.mensaje`}
                      control={control}
                      rules={ValidacionLegajo.juntaMedicaMensaje}
                      render={({ field }) => (
                        <div>
                          <label
                            htmlFor={`juntaMedicaMensaje-${index}`}
                            className="block text-sm font-medium text-gray-900"
                          >
                            Mensaje Aeronáutico
                          </label>
                          <input
                            {...field}
                            id={`juntaMedicaMensaje-${index}`}
                            value={field.value ?? ""}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.juntaMedica?.[index]?.mensaje && (
                      <span className="text-red-600">
                        {errors.juntaMedica[index].mensaje.message}
                      </span>
                    )}

                    <Controller
                      name={`juntaMedica.${index}.turnos`}
                      control={control}
                      rules={ValidacionLegajo.juntaMedicaTurnos}
                      render={({ field }) => (
                        <div>
                          <label
                            htmlFor={`juntaMedicaTurnos-${index}`}
                            className="block text-sm font-medium text-gray-900"
                          >
                            Turnos de Junta Médica
                          </label>
                          <input
                            {...field}
                            type="date"
                            id={`juntaMedicaTurnos-${index}`}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }
                          />
                        </div>
                      )}
                    />
                    {errors.juntaMedica?.[index]?.turnos && (
                      <span className="text-red-600">
                        {errors.juntaMedica[index].turnos.message}
                      </span>
                    )}

                    <Controller
                      name={`juntaMedica.${index}.observacion`}
                      control={control}
                      rules={ValidacionLegajo.juntaMedicaObservacion}
                      render={({ field }) => (
                        <div>
                          <label
                            htmlFor={`juntaMedicaObservacion-${index}`}
                            className="block text-sm font-medium text-gray-900"
                          >
                            Observación de Junta Médica
                          </label>
                          <textarea
                            {...field}
                            id={`juntaMedicaObservacion-${index}`}
                            value={field.value ?? ""}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.juntaMedica?.[index]?.observacion && (
                      <span className="text-red-600">
                        {errors.juntaMedica[index].observacion.message}
                      </span>
                    )}

                    <Controller
                      name={`juntaMedica.${index}.afeccion`}
                      control={control}
                      rules={ValidacionLegajo.juntaMedicaAfeccion}
                      render={({ field }) => (
                        <div>
                          <label
                            htmlFor={`afeccion-${index}`}
                            className="block text-sm font-medium text-gray-900"
                          >
                            Afección
                          </label>
                          <input
                            {...field}
                            type="text"
                            value={field.value ?? ""}
                            id={`afeccion-${index}`}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.juntaMedica?.[index]?.afeccion && (
                      <span className="text-red-600">
                        {errors.juntaMedica[index].afeccion.message}
                      </span>
                    )}
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => eliminarJuntaMedica(index)}
                        className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={agregarJuntaMedica}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Agregar Junta Médica
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-300 text-white font-semibold rounded-md shadow-md hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all"
                >
                 {initialData ? "Guardar Cambios" : "Enviar Formulario" } 
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
