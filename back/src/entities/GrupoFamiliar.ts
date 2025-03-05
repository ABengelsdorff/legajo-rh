import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class GrupoFamiliar {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  parentesco!: string;

  @Column()
  nombre!: string;

  @Column()
  apellido!: string;

  @Column()
  dni!: string;

  @Column()
  personalMilitar!: string;

  @Column()
  observaciones!: string;

  @ManyToOne(() => User, (user) => user.grupoFamiliar)
  user!: User;
}
