export const ValidacionLegajo = {
  nombre: {
    required: "El nombre es obligatorio",
    pattern: {
      value: /^[A-ZÁÉÍÓÚÑ\s]+$/,
      message: "Solo se permiten letras en mayúsculas y espacios",
    },
  },
  apellido: {
    required: "El apellido es obligatorio",
    pattern: {
      value: /^[A-ZÁÉÍÓÚÑ\s]+$/,
      message: "Solo se permiten letras en mayúsculas y espacios",
    },
  },
  sexo: {
    required: "El sexo es obligatorio",
  },
  fechadeNacimiento: {
    required: "La fecha de nacimiento es obligatoria",
  },
  numeroDeDni: {
    required: "El número de DNI es obligatorio",
    pattern: {
      value: /^[0-9]+$/,
      message: "Solo se permiten números",
    },
  },
  numeroDeCuil: {
    required: "El número de CUIL es obligatorio",
    pattern: {
      value: /^\d{2}-\d{8}-\d{1}$/,
      message: "Debe tener formato XX-XXXXXXXX-X",
    },
  },
  direccion: {
    required: "La dirección es obligatoria",
    pattern: {
      value: /^[A-ZÁÉÍÓÚÑ0-9\s\W_]+$/,
      message:
        "Solo se permiten letras mayúsculas, números, espacios y símbolos",
    },
  },
  codigoPostal: {
    required: "El código postal es obligatorio",
    pattern: {
      value: /^[A-Za-z0-9]{4,8}$/,
      message: "Debe tener entre 4 y 8 caracteres alfanuméricos",
    },
  },
  correoElectronico: {
    required: "El correo electrónico es obligatorio",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "El correo electrónico debe ser válido",
    },
  },

  cbu: {
    required: "El CBU es obligatorio",
    pattern: {
      value: /^[0-9]+$/,
      message: "Solo se permiten números",
    },
  },
  telefono: {
    required: "El número de celular es obligatorio",
    pattern: {
      value: /^[0-9]+$/,
      message: "Solo se permiten números",
    },
  },
  formacionAcademica: {
    required: "La formación académica es obligatoria",
  },
  estadoCivil: {
    required: "El estado civil es obligatorio",
  },
  activo: {
    required: "El campo 'Destinado en la Unidad' es obligatorio",
  },

  institutoDeFormacion: {
    required: "El instituto de formación es obligatorio",
  },

  especialidad: {
    required: "La especialidad es obligatoria",
    pattern: {
      value: /^[A-ZÁÉÍÓÚÑ0-9\s\W_]+$/,
      message:
        "Solo se permiten letras mayúsculas, números, espacios y símbolos",
    },
  },
  cargo: {
    required: "El cargo es obligatorio",
  },

  departamento: {
    required: "La especialidad avanzada es obligatoria",
    pattern: {
      value: /^[A-ZÁÉÍÓÚÑ0-9\s\W_]+$/,
      message:
        "Solo se permiten letras mayúsculas, números, espacios y símbolos",
    },
  },
  nivelDeIngles: {
    required: "El nivel de inglés es obligatorio",
    min: {
      value: 0,
      message: "El nivel de inglés no puede ser menor a 0%",
    },
    max: {
      value: 100,
      message: "El nivel de inglés no puede ser mayor a 100%",
    },
  },

  parentesco: {
    required: "El parentesco es obligatorio",
  },

  observaciones: {
    required: "Las observaciones son obligatorias",
    pattern: {
      value: /^[A-ZÁÉÍÓÚÑ0-9\s\W_]+$/,
      message:
        "Solo se permiten letras mayúsculas, números, espacios y símbolos",
    },
  },
  cursosRealizados: { required: "El nombre del curso es obligatorio" },
  cursosInstitucion: { required: "La institución es obligatoria" },
  cursosFecha: { required: "La fecha es obligatoria" },

  inicioParteDeEnfermo: {
    required: "La fecha de inicio del parte de enfermo es obligatoria",
  },
  fechaIngreso: {
    required: "Debe indicar si hay compromiso de servicio",
  },

  licenciaTipo: {
    required: "El tipo de licencia es obligatorio",
    maxLength: {
      value: 100,
      message: "El tipo no puede superar los 100 caracteres",
    },
  },

  licenciaDesde: {
    required: "La fecha de inicio es obligatoria",
  },

  licenciaHasta: {
    required: "La fecha de finalización es obligatoria",
  },

  licenciaObservaciones: {
    maxLength: {
      value: 500,
      message: "Las observaciones no pueden superar los 500 caracteres",
    },
  },

  evaluacionResultado: {
    required: "El resultado es obligatorio",
    maxLength: {
      value: 100,
      message: "Máximo 100 caracteres",
    },
  },
  evaluacionFecha: {
    required: "La fecha es obligatoria",
  },
  evaluacionObservacion: {
    maxLength: {
      value: 300,
      message: "Máximo 300 caracteres",
    },
  },
  evaluacionProfesional: {
    required: "El nombre del profesional es obligatorio",
    maxLength: {
      value: 100,
      message: "Máximo 100 caracteres",
    },
  },
};
