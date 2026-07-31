import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HonorarioEntity } from './entities/honorario.entity';
import { ProcesoEntity } from '../procesos/entities/proceso.entity';

import { HonorariosController } from './honorarios.controller';
import { HonorariosService } from './honorarios.service';

@Module({
  imports: [TypeOrmModule.forFeature([HonorarioEntity, ProcesoEntity])],
  controllers: [HonorariosController],
  providers: [HonorariosService],
  exports: [HonorariosService],
})
export class HonorariosModule {}
