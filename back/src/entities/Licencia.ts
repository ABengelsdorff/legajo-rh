import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Licencia {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "date", nullable: true })
  desde!: Date;

  @Column({ type: "date", nullable: true })
  hasta!: Date;

  @Column()
  tipo!: string;

  @Column({ type: "text" })
  observaciones!: string;

  @ManyToOne(() => User, (user) => user.licencias, { onDelete: "CASCADE" })
  user!: User;
}
