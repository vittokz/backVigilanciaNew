import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../../common/entities/base.entity';
import { ProcesoEntity } from '../../procesos/entities/proceso.entity';

export enum TipoPersonaProceso {
  DEMANDANTE = 'DEMANDANTE',
  DEMANDADO = 'DEMANDADO',
  OTRO = 'OTRO',
}

@Entity('abo_proceso_personas')
export class ProcesoPersonaEntity extends BaseEntity {
  @Column({
    type: 'enum',
    enum: TipoPersonaProceso,
  })
  tipo!: TipoPersonaProceso;

  @Column({
    length: 500,
  })
  nombre!: string;

  @Column({
    nullable: true,
    length: 50,
  })
  identificacion?: string;

  @Column({
    nullable: true,
    length: 100,
  })
  telefono?: string;

  @Column({
    nullable: true,
    length: 255,
  })
  correo?: string;

  @ManyToOne(() => ProcesoEntity, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'proceso_id',
  })
  proceso!: ProcesoEntity;
}
