import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../../common/entities/base.entity';
import { ProcesoEntity } from '../../procesos/entities/proceso.entity';

@Entity('abo_honorarios')
export class HonorarioEntity extends BaseEntity {
  @Column({
    type: 'decimal',
    precision: 18,
    scale: 2,
  })
  valor!: number;

  @Column({
    nullable: true,
    length: 500,
  })
  concepto?: string;

  @Column({
    type: 'date',
  })
  fecha!: Date;

  @Column({
    nullable: true,
    type: 'longtext',
  })
  observaciones?: string;

  @ManyToOne(() => ProcesoEntity, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'proceso_id',
  })
  proceso!: ProcesoEntity;
}
