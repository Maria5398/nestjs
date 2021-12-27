import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10, nullable: false, unique: true })
  number: string;

  @Column({ type: 'float', nullable: false })
  precio: number;
    nombre: string;
}