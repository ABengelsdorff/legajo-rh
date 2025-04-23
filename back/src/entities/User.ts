import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from "typeorm";
import { IsIn } from "class-validator";

import { CursoRealizado } from "./CursoRealizado";
import { EvaluacionMedica } from "./EvaluacionMedica";
import { GrupoFamiliar } from "./GrupoFamiliar";
import { Licencia } from "./Licencia";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  // 🧍 Información personal
  @Column()
  nombre!: string;

  @Column()
  apellido!: string;

  @Column()
  sexo!: string;

  @Column({ type: "date", nullable: true })
  fechaDeNacimiento!: Date | null;

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
  telefono!: string;

  @Column({ type: "text" })
  @IsIn(["SOLTERO", "CASADO", "CONCUBINATO", "DIVORCIADO", "VIUDO"])
  estadoCivil!: "SOLTERO" | "CASADO" | "CONCUBINATO" | "DIVORCIADO" | "VIUDO";

  // 💼 Información laboral

  @Column()
  cargo!: string;

  @Column()
  departamento!: string;

  @Column({ type: "date", nullable: true })
  fechaIngreso!: Date | null;

  @Column({ type: "text" })
  @IsIn(["SI", "NO"])
  activo!: "SI" | "NO";

  @Column()
  nivelDeIngles!: number;

  @Column()
  formacionAcademica!: string;

  @Column()
  especialidad!: string;

  // 👪 Grupo familiar
  @OneToMany(() => GrupoFamiliar, (grupoFamiliar) => grupoFamiliar.user, {
    cascade: true,
  })
  grupoFamiliar?: GrupoFamiliar[];

  // 🩺 Evaluaciones médicas
  @OneToMany(() => EvaluacionMedica, (evaluacion) => evaluacion.user, {
    cascade: true,
  })
  evaluacionesMedicas?: EvaluacionMedica[];

  // 📄 Licencias
  @OneToMany(() => Licencia, (licencia) => licencia.user, {
    cascade: true,
  })
  licencias?: Licencia[];

  // 🎓 Cursos realizados
  @OneToMany(() => CursoRealizado, (curso) => curso.user, { cascade: true })
  cursosRealizados?: CursoRealizado[];
}
