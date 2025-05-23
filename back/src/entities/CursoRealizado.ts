import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class CursoRealizado {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  institucion!: string;

  @Column({ type: "date", nullable: true })
  fechaFinalizacion!: Date;

  @ManyToOne(() => User, (user) => user.cursosRealizados, {
    onDelete: "CASCADE",
  })
  user!: User;
}
