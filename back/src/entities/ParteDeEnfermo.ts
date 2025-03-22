import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class ParteDeEnfermo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'date', nullable: true })
  inicio!: Date;

  @Column({ type: 'date', nullable: true })
  finalizacion!: Date;

  @Column({ type: 'text' })
  observaciones!: string;

  @ManyToOne(() => User, (user) => user.parteDeEnfermo, { onDelete: 'CASCADE' })
  user!: User;
}
