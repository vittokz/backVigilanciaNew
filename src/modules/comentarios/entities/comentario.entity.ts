import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../../common/entities/base.entity';
import { ProcesoEntity } from '../../procesos/entities/proceso.entity';

@Entity('abo_comentarios')
export class ComentarioEntity extends BaseEntity {
  @Column({
    name: 'comentario',
    type: 'longtext',
  })
  comentario!: string;

  @Column({
    name: 'usuario_id',
    type: 'bigint',
    nullable: false,
  })
  usuarioId!: number;

  @ManyToOne(() => ProcesoEntity, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'proceso_id',
  })
  proceso!: ProcesoEntity;
}
