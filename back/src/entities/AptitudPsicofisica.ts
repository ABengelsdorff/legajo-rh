import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class AptitudPsicofisica {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  estado!: string;

  @Column({ type: 'text' })
  observacion!: string;

  @ManyToOne(() => User, (user) => user.aptitudPsicofisica, { onDelete: 'CASCADE' })
  user!: User;
}
