import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class CompromisoDeServicio {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  compromisoDeServicio!: string;

  @Column({ type: 'date', nullable: true })
  ultimoAscenso!: Date | null;

  @Column()
  fotoDeLegajo!: string; 

  @OneToOne(() => User, (user) => user.compromisoDeServicio)
  @JoinColumn() // Necesario en el lado dueño de la relación
  user!: User;
}
