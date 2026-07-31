import { BaseEntity } from 'src/common/entities/base.entity';
import { ProcesoEntity } from 'src/modules/procesos/entities/proceso.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('abo_despachos')
export class DespachoEntity extends BaseEntity {
  @Column({
    length: 100,
  })
  tipo!: string;

  @Column({
    length: 500,
  })
  nombre!: string;

  @Column({
    length: 150,
  })
  ciudad!: string;

  @Column({
    nullable: true,
    length: 500,
  })
  direccion?: string;

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

  @Column({
    default: true,
  })
  estado!: boolean;

  @OneToMany(() => ProcesoEntity, (proceso) => proceso.despacho)
  procesos!: ProcesoEntity[];
}
