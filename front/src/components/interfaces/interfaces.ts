export interface IGrupoFamiliar {
  parentesco: string;
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: string | Date; 
  observaciones: string;
}

export interface IUser {
  id?: number;

  // 🧍 Información personal
  nombre: string;
  apellido: string;
  sexo: "FEMENINO" | "MASCULINO" | "";
  fechaDeNacimiento: Date | string;
  numeroDeDni: string;
  numeroDeCuil: string;
  direccion: string;
  codigoPostal: string;
  correoElectronico: string;
  telefono: string;
  estadoCivil:
    | "SOLTERO"
    | "CASADO"
    | "CONCUBINATO"
    | "DIVORCIADO"
    | "VIUDO"
    | "";


  // 💼 Información laboral
  cargo: string;
  departamento: string;
  fechaIngreso: string; 
  activo: "SI" | "NO" | "";
  formacionAcademica:
    | "SECUNDARIO INCOMPLETO"
    | "SECUNDARIO COMPLETO"
    | "TERCIARIO INCOMPLETO"
    | "TERCIARIO COMPLETO"
    | "UNIVERSITARIO INCOMPLETO"
    | "UNIVERSITARIO COMPLETO"
    | "";
  especialidad: string;
  nivelDeIngles: number;

  grupoFamiliar: IGrupoFamiliar[];

  evaluacionesMedicas: Array<{
    resultado: string;
    fecha: Date | string | null;
    observacion: string;
    profesional: string;
  }>;

  licencias: Array<{
    desde?: Date | string;
    hasta?: Date | string;
    tipo: string;
    observaciones: string;
  }>;

  cursosRealizados: Array<{
    id?: number;
    nombre: string;
    institucion: string;
    fechaFinalizacion?: Date | string;
  }>;
}

// 📝 Información de registro
export interface IRegisterData {
  id?: string;
  nombre: string;
  apellido: string;
  grado: string;
  cargo: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
