import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../../common/entities/base.entity';
import { ProcesoEntity } from '../../procesos/entities/proceso.entity';

@Entity('abo_archivos')
export class ArchivoEntity extends BaseEntity {
  @Column({
    length: 255,
  })
  nombre!: string;

  @Column({
    name: 'nombre_original',
    length: 255,
  })
  nombreOriginal!: string;

  @Column({
    length: 1000,
  })
  ruta!: string;

  @Column({
    length: 20,
  })
  extension!: string;

  @Column({
    name: 'mime_type',
    length: 100,
  })
  mimeType!: string;

  @Column({
    type: 'bigint',
  })
  tamanio!: number;

  @Column({
    default: true,
  })
  activo!: boolean;

  @ManyToOne(() => ProcesoEntity, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'proceso_id',
  })
  proceso!: ProcesoEntity;
}
