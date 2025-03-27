"use client";

import { useForm, Controller, useFieldArray } from "react-hook-form";
import { ValidacionLegajo } from "../utils/rulesForm";
import { IUser } from "../interfaces/interfaces";
import { Button } from "../ui/button";
import { useEffect } from "react";
export function UserEditForm({
  user,
  onCancel,
  onSave,
}: {
  user: IUser;
  onCancel: () => void;
  onSave: (updatedUser: IUser) => void;
}) {
  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<IUser>({
    mode: "onChange",
    defaultValues: user,
  });

  useEffect(() => {
    reset(user);
  }, [user, reset]);

  const onSubmit = (data: IUser) => {
    onSave(data);
  };
  
  const {
    fields: grupoFamiliar,
    append: addFamilyMember,
    remove: removeFamilyMember,
  } = useFieldArray({
    control,
    name: "grupoFamiliar",
  });

  const {
    fields: actuaciones,
    append: addActuacion,
    remove: removeActuacion,
  } = useFieldArray({
    control,
    name: "actuaciones",
  });

  const {
    fields: solicitudes,
    append: addSolicitud,
    remove: removeSolicitud,
  } = useFieldArray({
    control,
    name: "solicitudes",
  });

  const {
    fields: juntaMedica,
    append: addJuntaMedica,
    remove: removeJuntaMedica,
  } = useFieldArray({
    control,
    name: "juntaMedica",
  });

  const {
    fields: parteDeEnfermo,
    append: addParteDeEnfermo,
    remove: removeParteDeEnfermo,
  } = useFieldArray({
    control,
    name: "parteDeEnfermo",
  });

  const {
    fields: aptitudPsicofisica,
    append: addAptitudPsicofisica,
    remove: removeAptitudPsicofisica,
  } = useFieldArray({
    control,
    name: "aptitudPsicofisica",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Información Personal
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="nombre"
            control={control}
            rules={ValidacionLegajo.nombre}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input {...field} className="w-full p-2 border rounded-md" />
                {errors.nombre && (
                  <span className="text-red-600">{errors.nombre.message}</span>
                )}
              </div>
            )}
          />

          <Controller
            name="apellido"
            control={control}
            rules={ValidacionLegajo.apellido}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Apellido
                </label>
                <input {...field} className="w-full p-2 border rounded-md" />
                {errors.apellido && (
                  <span className="text-red-600">
                    {errors.apellido.message}
                  </span>
                )}
              </div>
            )}
          />

          <Controller
            name="sexo"
            control={control}
            rules={ValidacionLegajo.sexo}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium mb-1">Sexo</label>
                <select {...field} className="w-full p-2 border rounded-md">
                  <option value="">Seleccionar...</option>
                  <option value="MASCULINO">Masculino</option>
                  <option value="FEMENINO">Femenino</option>
                </select>
                {errors.sexo && (
                  <span className="text-red-600">{errors.sexo.message}</span>
                )}
              </div>
            )}
          />
          <Controller
            name="fechaDeNacimiento"
            control={control}
            rules={ValidacionLegajo.fechadeNacimiento}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  {...field}
                  value={
                    field.value
                      ? new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? new Date(e.target.value) : null
                    )
                  }
                  className="w-full p-2 border rounded-md"
                />
                {errors.fechaDeNacimiento && (
                  <span className="text-red-600">
                    {errors.fechaDeNacimiento.message}
                  </span>
                )}
              </div>
            )}
          />
          <Controller
            name="numeroDeDni"
            control={control}
            rules={ValidacionLegajo.numeroDeDni}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Número de DNI
                </label>
                <input {...field} className="w-full p-2 border rounded-md" />
                {errors.numeroDeDni && (
                  <span className="text-red-600">
                    {errors.numeroDeDni.message}
                  </span>
                )}
              </div>
            )}
          />
          <Controller
            name="numeroDeCuil"
            control={control}
            rules={ValidacionLegajo.numeroDeCuil}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Número de CUIL
                </label>
                <input {...field} className="w-full p-2 border rounded-md" />
                {errors.numeroDeCuil && (
                  <span className="text-red-600">
                    {errors.numeroDeCuil.message}
                  </span>
                )}
              </div>
            )}
          />
          <Controller
            name="grupoSanguineo"
            control={control}
            rules={ValidacionLegajo.grupoSanguineo}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Grupo Sanguíneo
                </label>
                <input {...field} className="w-full p-2 border rounded-md" />
                {errors.grupoSanguineo && (
                  <span className="text-red-600">
                    {errors.grupoSanguineo.message}
                  </span>
                )}
              </div>
            )}
          />

          <Controller
            name="direccion"
            control={control}
            rules={ValidacionLegajo.direccion}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Direccion
                </label>
                <input {...field} className="w-full p-2 border rounded-md" />
                {errors.direccion && (
                  <span className="text-red-600">
                    {errors.direccion.message}
                  </span>
                )}
              </div>
            )}
          />

          <Controller
            name="codigoPostal"
            control={control}
            rules={ValidacionLegajo.codigoPostal}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Codigo Postal
                </label>
                <input {...field} className="w-full p-2 border rounded-md" />
                {errors.codigoPostal && (
                  <span className="text-red-600">
                    {errors.codigoPostal.message}
                  </span>
                )}
              </div>
            )}
          />

          <Controller
            name="correoElectronico"
            control={control}
            rules={ValidacionLegajo.correoElectronico}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  {...field}
                  className="w-full p-2 border rounded-md"
                />
                {errors.correoElectronico && (
                  <span className="text-red-600">
                    {errors.correoElectronico.message}
                  </span>
                )}
              </div>
            )}
          />

          <Controller
            name="cbu"
            control={control}
            rules={ValidacionLegajo.cbu}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium mb-1">CBU</label>
                <input {...field} className="w-full p-2 border rounded-md" />
                {errors.cbu && (
                  <span className="text-red-600">{errors.cbu.message}</span>
                )}
              </div>
            )}
          />

          <Controller
            name="numeroDeCelular"
            control={control}
            rules={ValidacionLegajo.numeroDeCelular}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Número de Celular
                </label>
                <input {...field} className="w-full p-2 border rounded-md" />
                {errors.numeroDeCelular && (
                  <span className="text-red-600">
                    {errors.numeroDeCelular.message}
                  </span>
                )}
              </div>
            )}
          />

          <Controller
            name="formacionAcademica"
            control={control}
            rules={ValidacionLegajo.formacionAcademica}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Formación Academica
                </label>
                <input {...field} className="w-full p-2 border rounded-md" />
                {errors.formacionAcademica && (
                  <span className="text-red-600">
                    {errors.formacionAcademica.message}
                  </span>
                )}
              </div>
            )}
          />

          <Controller
            name="estadoCivil"
            control={control}
            rules={ValidacionLegajo.estadoCivil}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Estado Civil
                </label>
                <input {...field} className="w-full p-2 border rounded-md" />
                {errors.estadoCivil && (
                  <span className="text-red-600">
                    {errors.estadoCivil.message}
                  </span>
                )}
              </div>
            )}
          />
        </div>
      </div>

      {/* Información Profesional */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Información Profesional
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="destinadoEnLaUnidad"
            control={control}
            rules={ValidacionLegajo.destinadoEnLaUnidad}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Destinado en la Unidad
                </label>
                <select {...field} className="w-full p-2 border rounded-md">
                  <option value="">Seleccionar...</option>
                  <option value="SI">Sí</option>
                  <option value="NO">No</option>
                </select>
                {errors.destinadoEnLaUnidad && (
                  <span className="text-red-600">
                    {errors.destinadoEnLaUnidad.message}
                  </span>
                )}
              </div>
            )}
          />
          <Controller
            name="numeroDeIosfa"
            control={control}
            rules={ValidacionLegajo.numeroDeIosfa}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Número de IOSFA
                </label>
                <input {...field} className="w-full p-2 border rounded-md" />
                {errors.numeroDeIosfa && (
                  <span className="text-red-600">
                    {errors.numeroDeIosfa.message}
                  </span>
                )}
              </div>
            )}
          />
          <Controller
            name="institutoDeFormacion"
            control={control}
            rules={ValidacionLegajo.institutoDeFormacion}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Instituto de Formación
                </label>
                <select {...field} className="w-full p-2 border rounded-md">
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
                {errors.institutoDeFormacion && (
                  <span className="text-red-600">
                    {errors.institutoDeFormacion.message}
                  </span>
                )}
              </div>
            )}
          />
          <Controller
            name="escalafon"
            control={control}
            rules={ValidacionLegajo.escalafon}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Escalafón
                </label>
                <input {...field} className="w-full p-2 border rounded-md" />
                {errors.escalafon && (
                  <span className="text-red-600">
                    {errors.escalafon.message}
                  </span>
                )}
              </div>
            )}
          />
          <Controller
            name="grado"
            control={control}
            rules={ValidacionLegajo.grado}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium mb-1">Grado</label>
                <select {...field} className="w-full p-2 border rounded-md">
                  <option value="">Seleccionar...</option>
                  <option value="CABO">CABO</option>
                  <option value="CABO PRIMERO">CABO PRIMERO</option>
                  <option value="CABO PRINCIPAL">CABO PRINCIPAL</option>
                  <option value="SUBOFICIAL AUXILIAR">
                    SUBOFICIAL AUXILIAR
                  </option>
                  <option value="SUBOFICIAL AYUDANTE">
                    SUBOFICIAL AYUDANTE
                  </option>
                  <option value="SUBOFICIAL PRINCIPAL">
                    SUBOFICIAL PRINCIPAL
                  </option>
                  <option value="SUBOFICIAL MAYOR">SUBOFICIAL MAYOR</option>
                </select>
                {errors.grado && (
                  <span className="text-red-600">{errors.grado.message}</span>
                )}
              </div>
            )}
          />
          <Controller
            name="destinoJbGrupos"
            control={control}
            rules={ValidacionLegajo.destinoJbGrupos}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Destino JB Grupos
                </label>
                <select {...field} className="w-full p-2 border rounded-md">
                  <option value="">Seleccionar...</option>
                  <option value="JEFATURA">JEFATURA</option>
                  <option value="GRUPO BASE">GRUPO BASE</option>
                  <option value="GRUPO TECNICO">GRUPO TECNICO</option>
                  <option value="GRUPO AEREO">GRUPO AEREO</option>
                </select>
                {errors.destinoJbGrupos && (
                  <span className="text-red-600">
                    {errors.destinoJbGrupos.message}
                  </span>
                )}
              </div>
            )}
          />
          <Controller
            name="destinoInterno"
            control={control}
            rules={ValidacionLegajo.destinoInterno}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Destino Interno
                </label>
                <input {...field} className="w-full p-2 border rounded-md" />
                {errors.destinoInterno && (
                  <span className="text-red-600">
                    {errors.destinoInterno.message}
                  </span>
                )}
              </div>
            )}
          />
          <Controller
            name="cargo"
            control={control}
            rules={ValidacionLegajo.cargo}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium mb-1">Cargo</label>
                <select {...field} className="w-full p-2 border rounded-md">
                  <option value="">Seleccionar...</option>
                  <option value="ENCARGADO">ENCARGADO</option>
                  <option value="AUXILIAR">AUXILIAR</option>
                </select>
                {errors.cargo && (
                  <span className="text-red-600">{errors.cargo.message}</span>
                )}
              </div>
            )}
          />
          <Controller
            name="especialidad"
            control={control}
            rules={ValidacionLegajo.especialidad}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Especialidad
                </label>
                <input {...field} className="w-full p-2 border rounded-md" />
                {errors.especialidad && (
                  <span className="text-red-600">
                    {errors.especialidad.message}
                  </span>
                )}
              </div>
            )}
          />
          <Controller
            name="especialidadAvanzada"
            control={control}
            rules={ValidacionLegajo.especialidadAvanzada}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Especialidad Avanzada
                </label>
                <input {...field} className="w-full p-2 border rounded-md" />
                {errors.especialidadAvanzada && (
                  <span className="text-red-600">
                    {errors.especialidadAvanzada.message}
                  </span>
                )}
              </div>
            )}
          />
          <Controller
            name="nivelDeIngles"
            control={control}
            rules={ValidacionLegajo.nivelDeIngles}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nivel de Inglés
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  {...field}
                  className="w-full"
                />
                {errors.nivelDeIngles && (
                  <span className="text-red-600">
                    {errors.nivelDeIngles.message}
                  </span>
                )}
              </div>
            )}
          />
          <Controller
            name="rti"
            control={control}
            rules={ValidacionLegajo.rti}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium mb-1">RTI</label>
                <input {...field} className="w-full p-2 border rounded-md" />
                {errors.rti && (
                  <span className="text-red-600">{errors.rti.message}</span>
                )}
              </div>
            )}
          />
          <Controller
            name="destinoAnterior"
            control={control}
            rules={ValidacionLegajo.destinoAnterior}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Destino Anterior
                </label>
                <input {...field} className="w-full p-2 border rounded-md" />
                {errors.destinoAnterior && (
                  <span className="text-red-600 ">
                    {errors.destinoAnterior.message}
                  </span>
                )}
              </div>
            )}
          />
          <Controller
            name="correoInstitucional"
            control={control}
            rules={ValidacionLegajo.correoInstitucional}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Correo Institucional
                </label>
                <input
                  type="email"
                  {...field}
                  className="w-full p-2 border rounded-md"
                />
                {errors.correoInstitucional && (
                  <span className="text-red-600">
                    {errors.correoInstitucional.message}
                  </span>
                )}
              </div>
            )}
          />
          <Controller
            name="usuarioGde"
            control={control}
            rules={ValidacionLegajo.usuarioGde}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Usuario GDE
                </label>
                <input {...field} className="w-full p-2 border rounded-md" />
                {errors.usuarioGde && (
                  <span className="text-red-600">
                    {errors.usuarioGde.message}
                  </span>
                )}
              </div>
            )}
          />
        </div>
      </div>

    {/* Cursos Realizados */}
<div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
  <h3 className="text-xl font-semibold text-gray-800 mb-4">
    Cursos Realizados
  </h3>

  {watch("cursosRealizados")?.map((curso, index) => (
    <div key={index} className="flex items-center gap-2 mb-2">
      <input
        {...register(`cursosRealizados.${index}`, {
          required: "Campo requerido",
          minLength: {
            value: 2,
            message: "Mínimo 2 caracteres",
          },
          pattern: {
            value: /^[A-ZÁÉÍÓÚÑ\s]+$/,
            message: "Solo mayúsculas y espacios",
          },
        })}
        className="flex-1 p-2 border rounded-md"
      />
      <button
        type="button"
        onClick={() => {
          const cursos = watch("cursosRealizados") || [];
          const nuevosCursos = [...cursos];
          nuevosCursos.splice(index, 1); // Elimina el curso actual
          setValue("cursosRealizados", nuevosCursos);
        }}
        className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Eliminar
      </button>
    </div>
  ))}

  {errors.cursosRealizados &&
    errors.cursosRealizados.map((error, index) =>
      error ? (
        <p key={index} className="text-red-500 mb-2">
          {error.message}
        </p>
      ) : null
    )}

  <Button
    type="button"
    onClick={() => {
      const cursos = watch("cursosRealizados") || [];
      setValue("cursosRealizados", [...cursos, ""]);
    }}
  >
    Agregar Curso
  </Button>
</div>



      {/* Grupo Familiar */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Grupo Familiar
        </h3>

        {grupoFamiliar.map((item, index) => (
  <div key={item.id} className="grid grid-cols-1 md:grid-cols-3 gap-4">

<div className="flex flex-col">
  <Controller
    name={`grupoFamiliar.${index}.nombre`}
    control={control}
    rules={ValidacionLegajo.nombre}
    render={({ field }) => (
      <input {...field} placeholder="Nombre" className="p-2 border rounded-md" />
    )}
  />
  {errors.grupoFamiliar?.[index]?.nombre && (
    <span className="text-red-600 text-sm mt-1">
      {errors.grupoFamiliar[index].nombre?.message}
    </span>
  )}
</div>

<div className="flex flex-col">
    <Controller
      name={`grupoFamiliar.${index}.apellido`}
      control={control}
      rules={ValidacionLegajo.apellido}
      render={({ field }) => (
        <input {...field} placeholder="Apellido" className="p-2 border rounded-md" />
      )}
    />
    {errors.grupoFamiliar?.[index]?.apellido && (
      <span className="text-red-600 text-sm mt-1">{errors.grupoFamiliar[index].apellido?.message}</span>
    )}
    </div>

    <div className="flex flex-col">
    <Controller
      name={`grupoFamiliar.${index}.dni`}
      control={control}
      rules={ValidacionLegajo.numeroDeDni}
      render={({ field }) => (
        <input {...field} placeholder="DNI" className="p-2 border rounded-md" />
      )}
    />
    {errors.grupoFamiliar?.[index]?.dni && (
      <span className="text-red-600">{errors.grupoFamiliar[index].dni?.message}</span>
    )}
    </div>
    
    <div className="flex flex-col">
    <Controller
      name={`grupoFamiliar.${index}.parentesco`}
      control={control}
      rules={ValidacionLegajo.parentesco}
      render={({ field }) => (
        <select {...field} className="p-2 border rounded-md">
          <option value="">Seleccionar...</option>
          <option value="CONYUGUE">Cónyuge</option>
          <option value="PADRE">Padre</option>
          <option value="MADRE">Madre</option>
          <option value="HIJO">Hijo</option>
          <option value="HIJA">Hija</option>
          <option value="OTRO">Otro</option>
        </select>
      )}
    />
    {errors.grupoFamiliar?.[index]?.parentesco && (
      <span className="text-red-600">{errors.grupoFamiliar[index].parentesco?.message}</span>
    )}
    </div>

<div className="flex flex-col">
    <Controller
      name={`grupoFamiliar.${index}.personalMilitar`}
      control={control}
      rules={ValidacionLegajo.personalMilitar}
      render={({ field }) => (
        <select {...field} className="p-2 border rounded-md">
          <option value="">Seleccionar...</option>
          <option value="SI">SI</option>
          <option value="NO">NO</option>
        </select>
      )}
    />
    {errors.grupoFamiliar?.[index]?.personalMilitar && (
      <span className="text-red-600">{errors.grupoFamiliar[index].personalMilitar?.message}</span>
    )}
    </div>

<div className="flex flex-col">
    <Controller
      name={`grupoFamiliar.${index}.observaciones`}
      control={control}
      rules={ValidacionLegajo.observaciones}
      render={({ field }) => (
        <input {...field} placeholder="Observaciones" className="p-2 border rounded-md" />
      )}
    />
    {errors.grupoFamiliar?.[index]?.observaciones && (
      <span className="text-red-600">{errors.grupoFamiliar[index].observaciones?.message}</span>
    )}
    </div>
    <button
      type="button"
      onClick={() => removeFamilyMember(index)}
      className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
    >
      Eliminar
    </button>
  </div>
))}

              <Button
          type="button"
          onClick={() =>
            addFamilyMember({
              nombre: "",
              apellido: "",
              dni: "",
              parentesco: "",
              personalMilitar: "",
              observaciones: "",
            })
          }
        >
          Agregar Familiar
        </Button>

      </div>


     





      {/* Situación de Revista */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Situación de Revista
        </h3>
        <Controller
          name="situacionDeRevista"
          control={control}
          rules={ValidacionLegajo.situacionDeRevista}
          render={({ field }) => (
            <select {...field} className="w-full p-2 border rounded-md">
              <option value="">Seleccionar...</option>
              <option value="SERVICIO EFECTIVO">SERVICIO EFECTIVO</option>
              <option value="DISPONIBILIDAD">DISPONIBILIDAD</option>
              <option value="PASIVA">PASIVA</option>
            </select>
          )}
        />
        {errors.situacionDeRevista && (
          <span className="text-red-600">
            {errors.situacionDeRevista.message}
          </span>
        )}
      </div>

      {/* Compromiso de Servicio */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Compromiso de Servicio
        </h2>
        <div className="space-y-4">
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
                {errors.compromisoDeServicio && (
                  <span className="text-red-600">
                    {errors.compromisoDeServicio.message}
                  </span>
                )}
              </div>
            )}
          />

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
                      ? new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                  className="text-gray-900 mt-2 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm 
                    focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                {errors.ultimoAscenso && (
                  <span className="text-red-600">
                    {errors.ultimoAscenso.message}
                  </span>
                )}
              </div>
            )}
          />

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
                {errors.fotoDeLegajo && (
                  <span className="text-red-600">
                    {errors.fotoDeLegajo.message}
                  </span>
                )}
              </div>
            )}
          />
        </div>
      </div>

      {/* Solicitudes */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Solicitudes
        </h3>
        {solicitudes.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
          >
            <Controller
              name={`solicitudes.${index}.numeroDeExpediente`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Número de Expediente"
                  className="p-2 border rounded-md"
                />
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
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  value={
                    field.value
                      ? typeof field.value === "string"
                        ? field.value
                        : new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                  className="p-2 border rounded-md"
                />
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
              render={({ field }) => (
                <textarea
                  {...field}
                  placeholder="Observaciones"
                  className="p-2 border rounded-md"
                />
              )}
            />
            {errors.solicitudes?.[index]?.observaciones && (
              <span className="text-red-600">
                {errors.solicitudes[index].observaciones.message}
              </span>
            )}
            <Button
              type="button"
              onClick={() => removeSolicitud(index)}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Eliminar
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() =>
            addSolicitud({
              numeroDeExpediente: "",
              solicitud: { desde: "" },
              observaciones: "",
            })
          }
        >
          Agregar Solicitud
        </Button>
      </div>

      {/* Actuaciones por Enfermedad */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Actuaciones por Enfermedad
        </h3>
        {actuaciones.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
          >
            <Controller
              name={`actuaciones.${index}.numeroDeExpediente`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Número de Expediente"
                  className="p-2 border rounded-md"
                />
              )}
            />
            {errors.actuaciones?.[index]?.numeroDeExpediente && (
              <span className="text-red-600">
                {errors.actuaciones[index].numeroDeExpediente.message}
              </span>
            )}
            <Controller
              name={`actuaciones.${index}.afeccion`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Afección"
                  className="p-2 border rounded-md"
                />
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
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  value={
                    field.value
                      ? typeof field.value === "string"
                        ? field.value
                        : new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                  className="p-2 border rounded-md"
                />
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
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  value={
                    field.value
                      ? typeof field.value === "string"
                        ? field.value
                        : new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                  className="p-2 border rounded-md"
                />
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
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  value={
                    field.value
                      ? typeof field.value === "string"
                        ? field.value
                        : new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                  className="p-2 border rounded-md"
                />
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
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  value={
                    field.value
                      ? typeof field.value === "string"
                        ? field.value
                        : new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                  className="p-2 border rounded-md"
                />
              )}
            />
            {errors.actuaciones?.[index]?.pasiva?.hasta && (
              <span className="text-red-600">
                {errors.actuaciones[index].pasiva.hasta.message}
              </span>
            )}

            <Button
              type="button"
              onClick={() => removeActuacion(index)}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Eliminar
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() =>
            addActuacion({
              numeroDeExpediente: "",
              afeccion: "",
              disponibilidad: { desde: undefined, hasta: undefined },
              pasiva: { desde: undefined, hasta: undefined },
            })
          }
        >
          Agregar Actuación
        </Button>
      </div>

      {/* Parte de Enfermo */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Parte de Enfermo
        </h3>
        {parteDeEnfermo.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
          >
            <Controller
              name={`parteDeEnfermo.${index}.inicio`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  value={
                    field.value
                      ? typeof field.value === "string"
                        ? field.value
                        : new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                  className="p-2 border rounded-md"
                />
              )}
            />
            {errors.parteDeEnfermo?.[index]?.inicio && (
              <span className="text-red-600">
                {errors.parteDeEnfermo[index].inicio.message}
              </span>
            )}

            <Controller
              name={`parteDeEnfermo.${index}.finalizacion`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  value={
                    field.value
                      ? typeof field.value === "string"
                        ? field.value
                        : new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                  className="p-2 border rounded-md"
                />
              )}
            />
            {errors.parteDeEnfermo?.[index]?.finalizacion && (
              <span className="text-red-600">
                {errors.parteDeEnfermo[index].finalizacion.message}
              </span>
            )}
            <Controller
              name={`parteDeEnfermo.${index}.observaciones`}
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  placeholder="Observaciones"
                  className="p-2 border rounded-md"
                />
              )}
            />
            {errors.parteDeEnfermo?.[index]?.observaciones && (
              <span className="text-red-600">
                {errors.parteDeEnfermo[index].observaciones.message}
              </span>
            )}
            <Button
              type="button"
              onClick={() => removeParteDeEnfermo(index)}
              className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Eliminar
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() =>
            addParteDeEnfermo({
              inicio: undefined,
              finalizacion: undefined,
              observaciones: "",
            })
          }
        >
          Agregar Parte de Enfermo
        </Button>
      </div>

      {/* Aptitud Psicofísica */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Aptitud Psicofísica
        </h3>
        {aptitudPsicofisica.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
          >
            <Controller
              name={`aptitudPsicofisica.${index}.estado`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Estado"
                  className="p-2 border rounded-md"
                />
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
              render={({ field }) => (
                <textarea
                  {...field}
                  placeholder="Observación"
                  className="p-2 border rounded-md"
                />
              )}
            />
            {errors.aptitudPsicofisica?.[index]?.observacion && (
              <span className="text-red-600">
                {errors.aptitudPsicofisica[index].observacion.message}
              </span>
            )}
            <Button
              type="button"
              onClick={() => removeAptitudPsicofisica(index)}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Eliminar
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() => addAptitudPsicofisica({ estado: "", observacion: "" })}
        >
          Agregar Aptitud Psicofísica
        </Button>
      </div>

      {/* Junta Médica */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Junta Médica
        </h3>
        {juntaMedica.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
          >
            <Controller
              name={`juntaMedica.${index}.mensaje`}
              control={control}
              rules={ValidacionLegajo.juntaMedicaMensaje}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Mensaje Aeronáutico"
                  className="p-2 border rounded-md"
                />
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
                <input
                  {...field}
                  type="date"
                  value={
                    field.value
                      ? typeof field.value === "string"
                        ? field.value
                        : new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                  className="p-2 border rounded-md"
                />
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
                <textarea
                  {...field}
                  placeholder="Observación"
                  className="p-2 border rounded-md"
                />
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
                <input
                  {...field}
                  placeholder="Afección"
                  className="p-2 border rounded-md"
                />
              )}
            />
            {errors.juntaMedica?.[index]?.afeccion && (
              <span className="text-red-600">
                {errors.juntaMedica[index].afeccion.message}
              </span>
            )}
            <button
              type="button"
              onClick={() => removeJuntaMedica(index)}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Eliminar
            </button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() =>
            addJuntaMedica({
              mensaje: "",
              turnos: null,
              observacion: "",
              afeccion: "",
            })
          }
        >
          Agregar Junta Médica
        </Button>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" onClick={onCancel} variant="outline">
          Cancelar
        </Button>
        <Button type="submit">Guardar cambios</Button>
      </div>
    </form>
  );
}
