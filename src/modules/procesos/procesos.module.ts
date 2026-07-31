import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DespachoEntity } from '../despachos/entities/despacho.entity';

import { ProcesosController } from './procesos.controller';
import { ProcesoEntity } from './entities/proceso.entity';
import { ProcesosService } from './procesos.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProcesoEntity, DespachoEntity])],
  controllers: [ProcesosController],
  providers: [ProcesosService],
})
export class ProcesosModule {}
