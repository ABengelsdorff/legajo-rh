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
  fechaDeNacimiento: Date | null
  grupoSanguineo: string
  numeroDeDni: string
  numeroDeCuil: string
  direccion: string
  codigoPostal: string
  correoElectronico: string
  usuarioGde: string
  cbu: string
  numeroDeCelular: string
  numeroDeIosfa: string
  rti: string
  institutoDeFormacion: "EAM" | "ESFA" | "IFE" | "ESFAC" | "CUPROSO" | "CUSERPRO" | "INCORPORACION TROPA"
  grado:
    | "CABO"
    | "CABO PRIMERO"
    | "CABO PRINCIPAL"
    | "SUBOFICIAL AUXILIAR"
    | "SUBOFICIAL AYUDANTE"
    | "SUBOFICIAL PRINCIPAL"
    | "SUBOFICIAL MAYOR"
  destinadoEnLaUnidad: "" | "SI" | "NO"
  destinoJbGrupos: "JEFATURA" | "GRUPO BASE" | "ESCUADRON TECNICO" | "GRUPO AEREO"
  destinoInterno: string
  cargo: "JEFE" | "ENCARGADO" | "ASESOR" | "AUXILIAR"
  escalafon: "AIRE" | "TECNICO" | "GENERAL" | "COMPLEMENTARIO" | "SERVICIO" | "ADMINISTRACION"
  especialidad: string
  especialidadAvanzada: string
  cursosRealizados: string[]
  formacionAcademica: string
  nivelDeIngles: number
  estadoCivil: "SOLTERO" | "CASADO" | "CONCUBINATO" | "DIVORCIADO" | "VIUDO"
  grupoFamiliar: IGrupoFamiliar[];
  actuaciones: Array<{
    numeroDeExpediente: string
    situacionDeRevista: "SERVICIO EFECTIVO" | "DISPONIBILIDAD" | "PASIVA" | "LICENCIA EX 6 MESES"
    disponibilidad: { desde?: Date | string; hasta?: Date | string}
    pasiva: { desde?: Date | string; hasta?: Date | string}
  }>
  juntaMedica: Array<{
    mensaje: string
    turnos: Date | string | null
    observacion: string
    afeccion: string
  }>
}