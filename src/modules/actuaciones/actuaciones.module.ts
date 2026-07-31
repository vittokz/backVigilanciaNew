import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProcesoEntity } from '../procesos/entities/proceso.entity';

import { ActuacionesController } from './actuaciones.controller';
import { ActuacionesService } from './actuaciones.service';
import { ActuacionEntity } from './entities/actuacione.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActuacionEntity, ProcesoEntity])],
  controllers: [ActuacionesController],
  providers: [ActuacionesService],
  exports: [ActuacionesService],
})
export class ActuacionesModule {}
