import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Solicitud {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  numeroDeExpediente!: string;

  @Column({ type: 'date', nullable: true })
  desde?: Date;

  @Column({ type: 'date', nullable: true })
  hasta?: Date;

  @ManyToOne(() => User, (user) => user.solicitudes)
  user!: User;

}
