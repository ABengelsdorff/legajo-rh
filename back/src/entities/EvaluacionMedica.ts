import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class EvaluacionMedica {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  resultado!: string;

  @Column({ type: "date", nullable: true })
  fecha!: Date;

  @Column({ type: "text" })
  observacion!: string;

  @Column()
  profesional!: string;

  @ManyToOne(() => User, (user) => user.evaluacionesMedicas, {
    onDelete: "CASCADE",
  })
  user!: User;
}
