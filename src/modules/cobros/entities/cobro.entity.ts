import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../../common/entities/base.entity';
import { ProcesoEntity } from '../../procesos/entities/proceso.entity';

export enum EstadoCobro {
  PENDIENTE = 'PENDIENTE',
  PAGADO = 'PAGADO',
  ANULADO = 'ANULADO',
}

@Entity('abo_cobros')
export class CobroEntity extends BaseEntity {
  @Column({
    type: 'decimal',
    precision: 18,
    scale: 2,
  })
  valor!: number;

  @Column({
    length: 500,
  })
  concepto!: string;

  @Column({
    type: 'datetime',
  })
  fecha!: Date;

  @Column({
    type: 'enum',
    enum: EstadoCobro,
    default: EstadoCobro.PENDIENTE,
  })
  estado!: EstadoCobro;

  @ManyToOne(() => ProcesoEntity, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'proceso_id',
  })
  proceso!: ProcesoEntity;
}
