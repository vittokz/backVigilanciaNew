import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from '../../../common/entities/base.entity';

import { DespachoEntity } from '../../despachos/entities/despacho.entity';
import { ComentarioEntity } from '../../comentarios/entities/comentario.entity';
import { ArchivoEntity } from '../../archivos/entities/archivo.entity';
import { HonorarioEntity } from '../../honorarios/entities/honorario.entity';
import { CobroEntity } from '../../cobros/entities/cobro.entity';
import { ActuacionEntity } from 'src/modules/actuaciones/entities/actuacione.entity';

@Entity('abo_procesos')
export class ProcesoEntity extends BaseEntity {
  @Column({
    unique: true,
    length: 100,
    name: 'numero_radicado',
  })
  numeroRadicado!: string;

  @Column({
    length: 200,
  })
  jurisdiccion!: string;

  @Column({
    length: 200,
    name: 'tipo_proceso',
  })
  tipoProceso!: string;

  @Column({
    nullable: true,
    name: 'etapa_procesal',
    length: 200,
  })
  etapaProcesal?: string;

  @Column({
    nullable: true,
    type: 'longtext',
  })
  descripcion?: string;

  @Column({
    type: 'date',
    name: 'fecha_radicado',
  })
  fechaRadicado!: Date;

  @Column({
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  cuantia?: number;

  @Column({
    default: true,
  })
  estado!: boolean;

  @ManyToOne(() => DespachoEntity, {
    nullable: false,
  })
  @JoinColumn({
    name: 'despacho_id',
  })
  despacho!: DespachoEntity;

  @OneToMany(() => ActuacionEntity, (actuacion) => actuacion.proceso)
  actuaciones!: ActuacionEntity[];

  @OneToMany(() => ComentarioEntity, (comentario) => comentario.proceso)
  comentarios!: ComentarioEntity[];

  @OneToMany(() => ArchivoEntity, (archivo) => archivo.proceso)
  archivos!: ArchivoEntity[];

  @OneToMany(() => HonorarioEntity, (honorario) => honorario.proceso)
  honorarios!: HonorarioEntity[];

  @OneToMany(() => CobroEntity, (cobro) => cobro.proceso)
  cobros!: CobroEntity[];
}
