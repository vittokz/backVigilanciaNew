import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../../common/entities/base.entity';
import { ProcesoEntity } from '../../procesos/entities/proceso.entity';

@Entity('abo_actuaciones')
export class ActuacionEntity extends BaseEntity {
  @Column({
    length: 300,
  })
  titulo!: string;

  @Column({
    nullable: true,
    length: 200,
  })
  proveedor?: string;

  @Column({
    type: 'date',
  })
  fecha_actuacion!: Date;

  @Column({
    nullable: true,
    length: 300,
  })
  despacho?: string;

  @Column({
    nullable: true,
    type: 'longtext',
  })
  anotacion?: string;

  @ManyToOne(() => ProcesoEntity, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'proceso_id',
  })
  proceso!: ProcesoEntity;
}
