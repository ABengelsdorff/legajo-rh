import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Solicitud {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  numeroDeExpediente!: string;

  @Column("simple-json", { nullable: true })
  solicitud!: {
    desde?: Date;
  };

  @Column({ type: "text" })
  observaciones!: string;

  @ManyToOne(() => User, (user) => user.solicitudes)
  user!: User;
}
