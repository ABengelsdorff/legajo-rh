"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { ValidacionLegajo } from "../../components/utils/rulesForm";
import { createUser, updateUser } from "../../services/userServices";
import { IUser } from "../../components/interfaces/interfaces";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";

export default function LegajoProfesional({
  initialData,
  onSave,
}: {
  initialData?: IUser;
  onSave?: (data: IUser) => void;
}) {
  const [formSuccess, setFormSuccess] = useState(false);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUser>({
    mode: "onChange",
    defaultValues: initialData || {
      nombre: "",
      apellido: "",
      sexo: "",
      fechaDeNacimiento: "",
      numeroDeDni: "",
      numeroDeCuil: "",
      direccion: "",
      codigoPostal: "",
      correoElectronico: "",
      telefono: "",
      estadoCivil: "",
      cargo: "",
      departamento: "",
      fechaIngreso: "",
      activo: "",
      formacionAcademica: "",
      especialidad: "",
      nivelDeIngles: 0,
      grupoFamiliar: [],
      evaluacionesMedicas: [],
      licencias: [],
      cursosRealizados: [],
    },
  });

  const {
    fields: grupoFamiliarFields,
    append: appendGrupoFamiliar,
    remove: removeGrupoFamiliar,
  } = useFieldArray({
    control,
    name: "grupoFamiliar",
  });

  const {
    fields: evaluacionesMedicasFields,
    append: appendEvaluacionMedica,
    remove: removeEvaluacionMedica,
  } = useFieldArray({
    control,
    name: "evaluacionesMedicas",
  });

  const {
    fields: licenciasFields,
    append: appendLicencia,
    remove: removeLicencia,
  } = useFieldArray({
    control,
    name: "licencias",
  });

  const {
    fields: cursos,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "cursosRealizados",
  });

  useEffect(() => {
    if (initialData) {
      const normalizado: IUser = {
        ...initialData,
        sexo: (initialData.sexo?.toUpperCase() ?? "") as
          | "FEMENINO"
          | "MASCULINO"
          | "",
        estadoCivil: (initialData.estadoCivil?.toUpperCase() ?? "") as
          | "SOLTERO"
          | "CASADO"
          | "CONCUBINATO"
          | "DIVORCIADO"
          | "VIUDO"
          | "",
        cargo: (initialData.cargo?.toUpperCase() ?? "") as
          | "AUXILIAR"
          | "ENCARGADO"
          | "",
        formacionAcademica: (initialData.formacionAcademica?.toUpperCase() ??
          "") as IUser["formacionAcademica"],
        activo: (initialData.activo?.toUpperCase() ?? "") as "SI" | "NO" | "",
      };

      reset(normalizado);
    }
  }, [initialData, reset]);

  const onSubmit = async (data: IUser) => {
    try {
      let savedUser;

      if (!data.id) {
        savedUser = await createUser(data);
      } else {
        savedUser = await updateUser(data.id, data);
      }

      reset(data);
      setFormSuccess(true);

      setTimeout(() => {
        setFormSuccess(false);
        reset();
        router.push("/Buscador");
      }, 3000);

      if (onSave) {
        onSave(savedUser);
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
                        <Check
                          className="h-12 w-12 text-blue-600"
                          strokeWidth={3}
                        />
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
              <Image
                src="/logohr.png"
                alt="Logo Recursos Humanos"
                width={250}
                height={250}
                className="drop-shadow-xl"
              />
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
                Legajo Profesional
              </h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* //! Informacion personal */}
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
                            id="nombre"
                            type="text"
                            value={field.value ?? ""}
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

                    {/* Apellido */}
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
                            id="apellido"
                            type="text"
                            value={field.value ?? ""}
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

                    {/* Sexo */}
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
                            value={field.value ?? ""}
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

                    {/* Fecha de Nacimiento */}
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
                            {...field}
                            type="date"
                            id="fechaDeNacimiento"
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value) {
                                const [y, m, d] = value.split("-");
                                field.onChange(new Date(+y, +m - 1, +d, 12));
                              } else {
                                field.onChange("");
                              }
                            }}
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
                            id="numeroDeDni"
                            type="text"
                            value={field.value ?? ""}
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

                    {/* CUIL */}
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
                            id="numeroDeCuil"
                            type="text"
                            value={field.value ?? ""}
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

                    {/* Dirección */}
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
                            id="direccion"
                            type="text"
                            value={field.value ?? ""}
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

                    {/* Teléfono */}
                    <Controller
                      name="telefono"
                      control={control}
                      rules={ValidacionLegajo.telefono}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="telefono"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Número de Celular
                          </label>
                          <input
                            {...field}
                            id="telefono"
                            type="text"
                            value={field.value ?? ""}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.telefono && (
                      <span className="text-red-600">
                        {errors.telefono.message}
                      </span>
                    )}

                    {/* Estado Civil */}
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
                            value={field.value ?? ""}
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

                {/*//! Información Profesional */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Información Profesional
                  </h2>
                  <div className="space-y-4">
                    <Controller
                      name="activo"
                      control={control}
                      rules={ValidacionLegajo.activo}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="activo"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Activo
                          </label>
                          <select
                            {...field}
                            id="activo"
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          >
                            <option value="">Seleccionar...</option>
                            <option value="SI">SI</option>
                            <option value="NO">NO</option>
                          </select>
                        </div>
                      )}
                    />
                    {errors.activo && (
                      <span className="text-red-600">
                        {errors.activo.message}
                      </span>
                    )}

                    {/* Fecha de Ingresoo */}
                    <Controller
                      name="fechaIngreso"
                      control={control}
                      rules={ValidacionLegajo.fechaIngreso}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="fechaDeIngreso"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Fecha de Ingreso
                          </label>
                          <input
                            {...field}
                            type="date"
                            id="fechaDeIngreso"
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value) {
                                const [y, m, d] = value.split("-");
                                field.onChange(new Date(+y, +m - 1, +d, 12));
                              } else {
                                field.onChange("");
                              }
                            }}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.fechaIngreso && (
                      <span className="text-red-600">
                        {errors.fechaIngreso.message}
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
                            value={field.value ?? ""}
                            multiple={false}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          >
                            <option value="">Seleccionar...</option>
                            <option value="ENCARGADO">ENCARGADO</option>
                            <option value="AUXILIAR">AUXILIAR</option>
                            <option value="RECLUTADOR">RECLUTADOR</option>
                            <option value="ANALISTA">ANALISTA</option>
                            <option value="COORDINADOR">COORDINADOR</option>
                            <option value="ASISTENTE">ASISTENTE</option>
                            <option value="CONSULTOR">CONSULTOR</option>
                            <option value="JEFE">JEFE</option>
                            <option value="GERENTE">GERENTE</option>
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

                    {/* Formación Académica */}
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
                            value={field.value ?? ""}
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
                      name="departamento"
                      control={control}
                      rules={ValidacionLegajo.departamento}
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor="departamento"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Departamento
                          </label>
                          <select
                            {...field}
                            id="departamento"
                            value={field.value || ""}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          >
                            <option value="">Seleccionar...</option>
                            <option value="RECLUTAMIENTO Y SELECCIÓN">
                              RECLUTAMIENTO Y SELECCIÓN
                            </option>
                            <option value="CAPACITACIÓN Y DESARROLLO">
                              CAPACITACIÓN Y DESARROLLO
                            </option>
                            <option value="CONSULTORÍA ORGANIZACIONAL">
                              CONSULTORÍA ORGANIZACIONAL
                            </option>
                            <option value="EVALUACIONES PSICOTÉCNICAS">
                              EVALUACIONES PSICOTÉCNICAS
                            </option>
                            <option value="RELACIONES LABORALES">
                              RELACIONES LABORALES
                            </option>
                            <option value="OTROS">OTROS</option>
                          </select>
                        </div>
                      )}
                    />
                    {errors.departamento && (
                      <span className="text-red-600">
                        {errors.departamento.message}
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

                    {/* Código Postal */}
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
                            id="codigoPostal"
                            type="text"
                            value={field.value ?? ""}
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

                    {/* Correo Electrónico */}
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
                            id="correoElectronico"
                            type="email"
                            value={field.value ?? ""}
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
                  </div>
                </div>
              </div>

              {/* //!Cursos */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md mt-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Cursos
                </h2>
                <div className="space-y-4">
                  {cursos.map((curso, index) => (
                    <div
                      key={curso.id || index}
                      className="space-y-4 border p-4 rounded-lg bg-white"
                    >
                      {/* Nombre */}
                      <Controller
                        name={`cursosRealizados.${index}.nombre`}
                        control={control}
                        rules={ValidacionLegajo.cursosRealizados}
                        render={({ field }) => (
                          <div>
                            <label className="block text-sm font-medium text-gray-900">
                              Nombre del Curso
                            </label>
                            <input
                              {...field}
                              type="text"
                              value={field.value ?? ""}
                              onChange={(e) =>
                                field.onChange(e.target.value.toUpperCase())
                              }
                              placeholder="Ej: CURSO DE LOGÍSTICA"
                              className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                            {errors.cursosRealizados?.[index]?.nombre && (
                              <span className="text-red-600 text-sm">
                                {
                                  errors.cursosRealizados[index]?.nombre
                                    ?.message
                                }
                              </span>
                            )}
                          </div>
                        )}
                      />

                      {/* Institución */}
                      <Controller
                        name={`cursosRealizados.${index}.institucion`}
                        control={control}
                        rules={ValidacionLegajo.cursosInstitucion}
                        render={({ field }) => (
                          <div>
                            <label className="block text-sm font-medium text-gray-900">
                              Institución
                            </label>
                            <input
                              {...field}
                              type="text"
                              value={field.value ?? ""}
                              placeholder="Ej: UNIVERSIDAD TECNOLÓGICA"
                              className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                            {errors.cursosRealizados?.[index]?.institucion && (
                              <span className="text-red-600 text-sm">
                                {
                                  errors.cursosRealizados[index]?.institucion
                                    ?.message
                                }
                              </span>
                            )}
                          </div>
                        )}
                      />

                      {/* Fecha de finalización */}
                      <Controller
                        name={`cursosRealizados.${index}.fechaFinalizacion`}
                        control={control}
                        rules={ValidacionLegajo.cursosFecha}
                        render={({ field }) => (
                          <div>
                            <label className="block text-sm font-medium text-gray-900">
                              Fecha de Finalización
                            </label>
                            <input
                              {...field}
                              type="date"
                              value={
                                field.value
                                  ? new Date(field.value)
                                      .toISOString()
                                      .split("T")[0]
                                  : ""
                              }
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value) {
                                  field.onChange(value);
                                } else {
                                  field.onChange("");
                                }
                              }}
                              className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                            {errors.cursosRealizados?.[index]
                              ?.fechaFinalizacion && (
                              <span className="text-red-600 text-sm">
                                {
                                  errors.cursosRealizados[index]
                                    ?.fechaFinalizacion?.message
                                }
                              </span>
                            )}
                          </div>
                        )}
                      />

                      {/* Botón Eliminar */}
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Botón Agregar */}
                  <button
                    type="button"
                    onClick={() =>
                      append({
                        id: Date.now(),
                        nombre: "",
                        institucion: "",
                        fechaFinalizacion: "",
                      })
                    }
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
                {grupoFamiliarFields.map((familiar, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 p-4 bg-white rounded-lg"
                  >
                    {/* Columna Izquierda */}
                    <div className="space-y-4">
                      {/* Nombre */}
                      <Controller
                        name={`grupoFamiliar.${index}.nombre`}
                        control={control}
                        rules={ValidacionLegajo.nombre}
                        render={({ field }) => (
                          <div>
                            <label className="block text-sm font-medium text-gray-900">
                              Nombre
                            </label>
                            <input
                              {...field}
                              type="text"
                              value={field.value ?? ""}
                              className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                            {errors.grupoFamiliar?.[index]?.nombre && (
                              <span className="text-red-600 text-sm">
                                {errors.grupoFamiliar[index].nombre?.message}
                              </span>
                            )}
                          </div>
                        )}
                      />

                      {/* Apellido */}
                      <Controller
                        name={`grupoFamiliar.${index}.apellido`}
                        control={control}
                        rules={ValidacionLegajo.apellido}
                        render={({ field }) => (
                          <div>
                            <label className="block text-sm font-medium text-gray-900">
                              Apellido
                            </label>
                            <input
                              {...field}
                              type="text"
                              value={field.value ?? ""}
                              className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                            {errors.grupoFamiliar?.[index]?.apellido && (
                              <span className="text-red-600 text-sm">
                                {errors.grupoFamiliar[index].apellido?.message}
                              </span>
                            )}
                          </div>
                        )}
                      />

                      {/* DNI */}
                      <Controller
                        name={`grupoFamiliar.${index}.dni`}
                        control={control}
                        rules={ValidacionLegajo.numeroDeDni}
                        render={({ field }) => (
                          <div>
                            <label className="block text-sm font-medium text-gray-900">
                              DNI
                            </label>
                            <input
                              {...field}
                              type="text"
                              value={field.value ?? ""}
                              className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                            {errors.grupoFamiliar?.[index]?.dni && (
                              <span className="text-red-600 text-sm">
                                {errors.grupoFamiliar[index].dni?.message}
                              </span>
                            )}
                          </div>
                        )}
                      />
                    </div>

                    {/* Columna Derecha */}
                    <div className="space-y-4">
                      {/* Parentesco */}
                      <Controller
                        name={`grupoFamiliar.${index}.parentesco`}
                        control={control}
                        rules={ValidacionLegajo.parentesco}
                        render={({ field }) => (
                          <div>
                            <label className="block text-sm font-medium text-gray-900">
                              Parentesco
                            </label>
                            <select
                              {...field}
                              className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            >
                              <option value="">Seleccionar...</option>
                              <option value="CONYUGUE">CÓNYUGUE</option>
                              <option value="MADRE">MADRE</option>
                              <option value="PADRE">PADRE</option>
                              <option value="HIJO">HIJO</option>
                              <option value="HIJA">HIJA</option>
                              <option value="OTRO">OTRO</option>
                            </select>
                            {errors.grupoFamiliar?.[index]?.parentesco && (
                              <span className="text-red-600 text-sm">
                                {
                                  errors.grupoFamiliar[index].parentesco
                                    ?.message
                                }
                              </span>
                            )}
                          </div>
                        )}
                      />

                      {/* Fecha de Nacimiento */}
                      <Controller
                        name={`grupoFamiliar.${index}.fechaNacimiento`}
                        control={control}
                        rules={ValidacionLegajo.fechadeNacimiento}
                        render={({ field }) => (
                          <div>
                            <label className="block text-sm font-medium text-gray-900">
                              Fecha de Nacimiento
                            </label>
                            <input
                              {...field}
                              type="date"
                              value={
                                field.value
                                  ? new Date(field.value)
                                      .toISOString()
                                      .split("T")[0]
                                  : ""
                              }
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value) {
                                  const [year, month, day] = value.split("-");
                                  const date = new Date(
                                    Number(year),
                                    Number(month) - 1,
                                    Number(day),
                                    12
                                  );
                                  field.onChange(date);
                                } else {
                                  field.onChange(null);
                                }
                              }}
                              className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                            {errors.grupoFamiliar?.[index]?.fechaNacimiento && (
                              <span className="text-red-600 text-sm">
                                {
                                  errors.grupoFamiliar[index].fechaNacimiento
                                    ?.message
                                }
                              </span>
                            )}
                          </div>
                        )}
                      />

                      {/* Observaciones */}
                      <Controller
                        name={`grupoFamiliar.${index}.observaciones`}
                        control={control}
                        rules={ValidacionLegajo.observaciones}
                        render={({ field }) => (
                          <div>
                            <label className="block text-sm font-medium text-gray-900">
                              Observaciones
                            </label>
                            <textarea
                              {...field}
                              value={field.value ?? ""}
                              className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                            {errors.grupoFamiliar?.[index]?.observaciones && (
                              <span className="text-red-600 text-sm">
                                {
                                  errors.grupoFamiliar[index].observaciones
                                    ?.message
                                }
                              </span>
                            )}
                          </div>
                        )}
                      />

                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => removeGrupoFamiliar(index)}
                          className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Botón agregar */}
                <button
                  type="button"
                  onClick={() =>
                    appendGrupoFamiliar({
                      parentesco: "",
                      nombre: "",
                      apellido: "",
                      dni: "",
                      fechaNacimiento: "",
                      observaciones: "",
                    })
                  }
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Agregar Familiar
                </button>
              </div>

              {/* //!Licencias */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Licencias
                </h2>

                {licenciasFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="space-y-4 border p-4 rounded-lg mb-4 bg-white"
                  >
                    {/* Tipo de licencia */}
                    <Controller
                      name={`licencias.${index}.tipo`}
                      control={control}
                      rules={ValidacionLegajo.licenciaTipo}
                      render={({ field }) => (
                        <div>
                          <label
                            htmlFor={`licencia-tipo-${index}`}
                            className="block text-sm font-medium text-gray-900"
                          >
                            Tipo de Licencia
                          </label>
                          <input
                            {...field}
                            type="text"
                            id={`licencia-tipo-${index}`}
                            value={field.value || ""}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.licencias?.[index]?.tipo && (
                      <span className="text-red-600">
                        {errors.licencias[index].tipo?.message}
                      </span>
                    )}

                    {/* Desde */}
                    <Controller
                      name={`licencias.${index}.desde`}
                      control={control}
                      rules={ValidacionLegajo.licenciaDesde}
                      render={({ field }) => (
                        <div>
                          <label
                            htmlFor={`licencia-desde-${index}`}
                            className="block text-sm font-medium text-gray-900"
                          >
                            Desde
                          </label>
                          <input
                            type="date"
                            id={`licencia-desde-${index}`}
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value) {
                                const [y, m, d] = value.split("-");
                                field.onChange(new Date(+y, +m - 1, +d, 12));
                              } else {
                                field.onChange(null);
                              }
                            }}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.licencias?.[index]?.desde && (
                      <span className="text-red-600">
                        {errors.licencias[index].desde?.message}
                      </span>
                    )}

                    {/* Hasta */}
                    <Controller
                      name={`licencias.${index}.hasta`}
                      control={control}
                      rules={{
                        ...ValidacionLegajo.licenciaHasta,
                        validate: (value) => {
                          const desde =
                            control._formValues.licencias?.[index]?.desde;
                          if (desde && value) {
                            return (
                              new Date(value) >= new Date(desde) ||
                              "La fecha hasta debe ser posterior a la fecha desde"
                            );
                          }
                          return true;
                        },
                      }}
                      render={({ field }) => (
                        <div>
                          <label
                            htmlFor={`licencia-hasta-${index}`}
                            className="block text-sm font-medium text-gray-900"
                          >
                            Hasta
                          </label>
                          <input
                            type="date"
                            id={`licencia-hasta-${index}`}
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value) {
                                const [y, m, d] = value.split("-");
                                field.onChange(new Date(+y, +m - 1, +d, 12));
                              } else {
                                field.onChange(null);
                              }
                            }}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.licencias?.[index]?.hasta && (
                      <span className="text-red-600">
                        {errors.licencias[index].hasta?.message}
                      </span>
                    )}

                    {/* Observaciones */}
                    <Controller
                      name={`licencias.${index}.observaciones`}
                      control={control}
                      rules={ValidacionLegajo.licenciaObservaciones}
                      render={({ field }) => (
                        <div>
                          <label
                            htmlFor={`licencia-observaciones-${index}`}
                            className="block text-sm font-medium text-gray-900"
                          >
                            Observaciones
                          </label>
                          <textarea
                            {...field}
                            id={`licencia-observaciones-${index}`}
                            value={field.value ?? ""}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      )}
                    />
                    {errors.licencias?.[index]?.observaciones && (
                      <span className="text-red-600">
                        {errors.licencias[index].observaciones?.message}
                      </span>
                    )}

                    {/* Eliminar */}
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeLicencia(index)}
                        className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}

                {/* Agregar nueva licencia */}
                <button
                  type="button"
                  onClick={() =>
                    appendLicencia({
                      tipo: "",
                      desde: "",
                      hasta: "",
                      observaciones: "",
                    })
                  }
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Agregar Licencia
                </button>
              </div>

              {/* Evaluaciones Médicas */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Evaluaciones Médicas
                </h2>
                {evaluacionesMedicasFields.map((item, index) => (
                  <div
                    key={item.id}
                    className="space-y-4 border p-4 rounded-lg mb-4 bg-white"
                  >
                    <Controller
                      name={`evaluacionesMedicas.${index}.resultado`}
                      control={control}
                      rules={ValidacionLegajo.evaluacionResultado}
                      render={({ field }) => (
                        <div>
                          <label className="block text-sm font-medium text-gray-900">
                            Resultado
                          </label>
                          <input
                            {...field}
                            type="text"
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            value={field.value || ""}
                          />
                        </div>
                      )}
                    />
                    {errors.evaluacionesMedicas?.[index]?.resultado && (
                      <span className="text-red-600">
                        {errors.evaluacionesMedicas[index].resultado?.message}
                      </span>
                    )}

                    <Controller
                      name={`evaluacionesMedicas.${index}.fecha`}
                      control={control}
                      rules={ValidacionLegajo.evaluacionFecha}
                      render={({ field }) => (
                        <div>
                          <label className="block text-sm font-medium text-gray-900">
                            Fecha
                          </label>
                          <input
                            {...field}
                            type="date"
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value) {
                                const [y, m, d] = value.split("-");
                                field.onChange(new Date(+y, +m - 1, +d, 12));
                              } else {
                                field.onChange(null);
                              }
                            }}
                          />
                        </div>
                      )}
                    />
                    {errors.evaluacionesMedicas?.[index]?.fecha && (
                      <span className="text-red-600">
                        {errors.evaluacionesMedicas[index].fecha?.message}
                      </span>
                    )}

                    <Controller
                      name={`evaluacionesMedicas.${index}.observacion`}
                      control={control}
                      rules={ValidacionLegajo.evaluacionObservacion}
                      render={({ field }) => (
                        <div>
                          <label className="block text-sm font-medium text-gray-900">
                            Observaciones
                          </label>
                          <textarea
                            {...field}
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            value={field.value ?? ""}
                          />
                        </div>
                      )}
                    />
                    {errors.evaluacionesMedicas?.[index]?.observacion && (
                      <span className="text-red-600">
                        {errors.evaluacionesMedicas[index].observacion?.message}
                      </span>
                    )}

                    <Controller
                      name={`evaluacionesMedicas.${index}.profesional`}
                      control={control}
                      rules={ValidacionLegajo.evaluacionProfesional}
                      render={({ field }) => (
                        <div>
                          <label className="block text-sm font-medium text-gray-900">
                            Profesional
                          </label>
                          <input
                            {...field}
                            type="text"
                            className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            value={field.value || ""}
                          />
                        </div>
                      )}
                    />
                    {errors.evaluacionesMedicas?.[index]?.profesional && (
                      <span className="text-red-600">
                        {errors.evaluacionesMedicas[index].profesional?.message}
                      </span>
                    )}

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeEvaluacionMedica(index)}
                        className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    appendEvaluacionMedica({
                      resultado: "",
                      fecha: null,
                      observacion: "",
                      profesional: "",
                    })
                  }
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Agregar Evaluación Médica
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-300 text-white font-semibold rounded-md shadow-md hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all"
                >
                  {initialData ? "Guardar Cambios" : "Enviar Formulario"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
