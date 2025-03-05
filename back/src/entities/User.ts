import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsIn } from 'class-validator';

import { GrupoFamiliar } from './GrupoFamiliar';
import { Actuacion } from './Actuacion';
import { JuntaMedica } from './JuntaMedica';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  apellido!: string;

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
  usuarioGde!: string;

  @Column() 
  cbu!: string;

  @Column()
  numeroDeCelular!: string;

  @Column()
  numeroDeIosfa!: string;

  @Column()
  rti!: string;

  @Column({ type: 'text' })
  @IsIn(['EAM', 'ESFA', 'IFE', 'ESFAC', 'CUPROSO', 'CUSERPRO', 'INCORPORACION TROPA'])  
  institutoDeFormacion!: 'EAM' | 'ESFA' | 'IFE' | 'ESFAC' | 'CUPROSO' | 'CUSERPRO' | 'INCORPORACION TROPA'; 

  @Column({ type: 'text' })
  @IsIn(['CABO', 'CABO PRIMERO', 'CABO PRINCIPAL', 'SUBOFICIAL AUXILIAR', 'SUBOFICIAL AYUDANTE', 'SUBOFICIAL PRINCIPAL', 'SUBOFICIAL MAYOR'])
  grado!: 'CABO' | 'CABO PRIMERO' | 'CABO PRINCIPAL' | 'SUBOFICIAL AUXILIAR' | 'SUBOFICIAL AYUDANTE' | 'SUBOFICIAL PRINCIPAL' | 'SUBOFICIAL MAYOR';

  @Column()
  destinadoEnLaUnidad!: string;

  @Column({ type: 'text' })
  @IsIn(['JEFATURA', 'GRUPO BASE', 'ESCUADRON TECNICO', 'GRUPO AEREO'])
  destinoJbGrupos!: 'JEFATURA' | 'GRUPO BASE' | 'ESCUADRON TECNICO' | 'GRUPO AEREO';

  @Column()
  destinoInterno!: string; 

  @Column({ type: 'text' })
  @IsIn(['JEFE', 'ENCARGADO', 'ASESOR', 'AUXILIAR'])  
  cargo!: 'JEFE' | 'ENCARGADO' | 'ASESOR' | 'AUXILIAR';

  @Column({ type: 'text' })
  @IsIn(['AIRE', 'TECNICO', 'GENERAL', 'COMPLEMENTARIO', 'SERVICIO', 'ADMINISTRACION'])  
  escalafon!: 'AIRE' | 'TECNICO' | 'GENERAL' | 'COMPLEMENTARIO' | 'SERVICIO' | 'ADMINISTRACION';

  @Column()
  especialidad!: string;

  @Column()
  especialidadAvanzada!: string;

  @Column("simple-array")
  cursosRealizados!: string[];

  @Column("simple-array")
  formacionAcademica!: string[];

  @Column()
  nivelDeIngles!: number;

  @Column({ type: 'text' })
  @IsIn(['SOLTERO', 'CASADO', 'CONCUBINATO', 'DIVORCIADO', 'VIUDO'])  
  estadoCivil!: 'SOLTERO' | 'CASADO' | 'CONCUBINATO' | 'DIVORCIADO' | 'VIUDO';

  
  @OneToMany(() => GrupoFamiliar, (grupoFamiliar) => grupoFamiliar.user, { cascade: true })
  grupoFamiliar!: GrupoFamiliar[];


  @OneToMany(() => Actuacion, (actuacion) => actuacion.user, { cascade: true })
  actuaciones!: Actuacion[];

  @OneToMany(() => JuntaMedica, (juntaMedica) => juntaMedica.user, { cascade: true })
  juntaMedica!: JuntaMedica[];
}


