import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { IsIn } from 'class-validator';

import { GrupoFamiliar } from './GrupoFamiliar';
import { Actuacion } from './Actuacion';
import { JuntaMedica } from './JuntaMedica';
import { Solicitud } from './Solicitud';
import { ParteDeEnfermo } from './ParteDeEnfermo';
import { AptitudPsicofisica } from './AptitudPsicofisica';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  apellido!: string;

  @Column()
  sexo!: string

  @Column({ type: 'date', nullable: true })
  fechaDeNacimiento!: Date | null;

  @Column()
  grupoSanguineo!: string;

  @Column()
  numeroDeDni!: string;

  @Column()
  numeroDeCuil!: string;

  @Column()
  direccion!: string;

  @Column()
  codigoPostal!: string; 

  @Column()
  correoElectronico!: string;

  @Column()
  correoInstitucional!: string;

  @Column()
  usuarioGde!: string;

  @Column() 
  cbu!: string;

  @Column()
  numeroDeCelular!: string;

  @Column()
  numeroDeIosfa!: string;

  @Column()
  rti!: string;

  @Column()
  destinoAnterior!: string;

  @Column({ type: 'text' })
  @IsIn(['EAM', 'ESFA', 'IFE', 'ESFAC', 'CUPROSO', 'CUSERPRO', 'INCORPORACION TROPA', 'ESFAE', 'BAME'])  
  institutoDeFormacion!: 'EAM' | 'ESFA' | 'IFE' | 'ESFAC' | 'CUPROSO' | 'CUSERPRO' | 'INCORPORACION TROPA' | 'ESFAE' | 'BAME'; 

  @Column({ type: 'text' })
  @IsIn(['CABO', 'CABO PRIMERO', 'CABO PRINCIPAL', 'SUBOFICIAL AUXILIAR', 'SUBOFICIAL AYUDANTE', 'SUBOFICIAL PRINCIPAL', 'SUBOFICIAL MAYOR'])
  grado!: 'CABO' | 'CABO PRIMERO' | 'CABO PRINCIPAL' | 'SUBOFICIAL AUXILIAR' | 'SUBOFICIAL AYUDANTE' | 'SUBOFICIAL PRINCIPAL' | 'SUBOFICIAL MAYOR';

  @Column()
  destinadoEnLaUnidad!: string;

  @Column({ type: 'text' })
  @IsIn(['JEFATURA', 'GRUPO BASE', 'ESCUADRON TECNICO', 'GRUPO AEREO'])
  destinoJbGrupos!: 'JEFATURA' | 'GRUPO BASE' | 'GRUPO TECNICO' | 'GRUPO AEREO';

  @Column()
  destinoInterno!: string; 

  @Column({ type: 'text' })
  @IsIn(['ENCARGADO', 'AUXILIAR'])  
  cargo!:'ENCARGADO' | 'AUXILIAR';

  @Column()
  escalafon!: string; 

  @Column()
  especialidad!: string;

  @Column()
  especialidadAvanzada!: string;

  @Column("simple-array")
  cursosRealizados!: string[];

  @Column()
  formacionAcademica!: string;

  @Column()
  nivelDeIngles!: number;

  @Column()
  compromisoDeServicio!: string;

  @Column({ type: 'date', nullable: true })
  ultimoAscenso!: Date | null;

  @Column()
  fotoDeLegajo!: string; 

  @Column({ type: 'text' })
  @IsIn(['SOLTERO', 'CASADO', 'CONCUBINATO', 'DIVORCIADO', 'VIUDO'])  
  estadoCivil!: 'SOLTERO' | 'CASADO' | 'CONCUBINATO' | 'DIVORCIADO' | 'VIUDO';

  @OneToMany(() => GrupoFamiliar, (grupoFamiliar) => grupoFamiliar.user, { cascade: true })
  grupoFamiliar!: GrupoFamiliar[];

  @Column()
  situacionDeRevista!: string;

  @OneToMany(() => Actuacion, (actuacion) => actuacion.user, { cascade: true })
  actuaciones!: Actuacion[];

  @OneToMany(() => JuntaMedica, (juntaMedica) => juntaMedica.user, { cascade: true })
  juntaMedica!: JuntaMedica[];

  @OneToMany(() => Solicitud, (solicitudes) => solicitudes.user, { cascade: true })
  solicitudes!: Solicitud[];

  @OneToMany(() => ParteDeEnfermo, (parteDeEnfermo) => parteDeEnfermo.user, { cascade: true })
parteDeEnfermo!: ParteDeEnfermo[];

@OneToMany(() => AptitudPsicofisica, (aptitud) => aptitud.user, { cascade: true })
aptitudPsicofisica!: AptitudPsicofisica[];

}


