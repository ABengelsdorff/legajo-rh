import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { IsIn } from 'class-validator';

@Entity()
export class Actuacion {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  numeroDeExpediente!: string;

  @Column({ type: 'text' })
  @IsIn(['SERVICIO EFECTIVO', 'DISPONIBILIDAD', 'PASIVA', 'LICENCIA EX 6 MESES'])
  situacionDeRevista!: 'SERVICIO EFECTIVO' | 'DISPONIBILIDAD' | 'PASIVA' | 'LICENCIA EX 6 MESES';

  @Column('json')
  disponibilidad!: { desde?: Date; hasta?: Date };

  @Column('json')
  pasiva!: { desde?: Date; hasta?: Date };

  @ManyToOne(() => User, (user) => user.actuaciones)
  user!: User;
}
