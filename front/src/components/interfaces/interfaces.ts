interface IGrupoFamiliar {
  parentesco: string;
  nombre: string;
  apellido: string;
  dni: string;
  personalMilitar: "" | "SI" | "NO";
  observaciones: string;
}


export interface IUser {
  id: number
  nombre: string
  apellido: string
  sexo: "FEMENINO" | "MASCULINO" | "" 
  fechaDeNacimiento: Date | string
  grupoSanguineo: string
  numeroDeDni: string
  numeroDeCuil: string
  direccion: string
  codigoPostal: string
  correoElectronico: string
  correoInstitucional: string
  usuarioGde: string
  cbu: string
  numeroDeCelular: string
  numeroDeIosfa: string
  rti: string
  destinoAnterior: string
  institutoDeFormacion: "EAM" | "ESFA" | "IFE" | "ESFAC" | "CUPROSO" | "CUSERPRO" | "INCORPORACION TROPA" | "ESFAE" | "BAME" | ""
  grado:
    | "CABO"
    | "CABO PRIMERO"
    | "CABO PRINCIPAL"
    | "SUBOFICIAL AUXILIAR"
    | "SUBOFICIAL AYUDANTE"
    | "SUBOFICIAL PRINCIPAL"
    | "SUBOFICIAL MAYOR"
  destinadoEnLaUnidad: "" | "SI" | "NO"
  destinoJbGrupos: "JEFATURA" | "GRUPO BASE" | "GRUPO TECNICO" | "GRUPO AEREO" | ""
  destinoInterno: string
  cargo: "ENCARGADO" | "AUXILIAR" | ""
  escalafon: string
  especialidad: string
  especialidadAvanzada: string
  cursosRealizados: string[]
  formacionAcademica: "SECUNDARIO INCOMPLETO" | "SECUNDARIO COMPLETO" | "TERCIARIO INCOMPLETO" | "TERCIARIO COMPLETO" | "UNIVERSITARIO INCOMPLETO" | "UNIVERSITARIO COMPLETO" | ""
  nivelDeIngles: number
  estadoCivil: "SOLTERO" | "CASADO" | "CONCUBINATO" | "DIVORCIADO" | "VIUDO" | ""
  grupoFamiliar: IGrupoFamiliar[];
  situacionDeRevista: "SERVICIO EFECTIVO" | "DISPONIBILIDAD" | "PASIVA" | ""

  actuaciones: Array<{
    numeroDeExpediente: string
    afeccion: string 
    disponibilidad: { desde?: Date | string; hasta?: Date | string}
    pasiva: { desde?: Date | string; hasta?: Date | string}
  }>

  solicitudes: Array<{
    numeroDeExpediente: string
    solicitud: { desde?: Date | string}
    observaciones: string
  }>


  parteDeEnfermo: Array<{
    inicio?: Date | string;
    finalizacion?: Date | string;
    observaciones: string;
  }>;
  
  aptitudPsicofisica: Array<{
    estado: string;
    observacion: string;
  }>;

  juntaMedica: Array<{
    mensaje: string
    turnos: Date | string | null
    observacion: string
    afeccion: string
  }>

  compromisoDeServicio: "SI" | "NO" | "";
  ultimoAscenso: Date | string | null;
  fotoDeLegajo: "SI" | "NO" | "";
}