import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  nombreUsuario!: string;

  @Column()
  contraseña!: string;

  @Column({ default: 'USUARIO' })
  rol!: 'ADMIN' | 'USUARIO';
}
