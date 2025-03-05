import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class JuntaMedica {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  mensaje!: string;

  @Column({ type: 'date', nullable: true })
  turnos!: Date | null;

  @Column()
  observacion!: string;

  @Column()
  afeccion!: string;

  @ManyToOne(() => User, (user) => user.juntaMedica)
  user!: User;
}
