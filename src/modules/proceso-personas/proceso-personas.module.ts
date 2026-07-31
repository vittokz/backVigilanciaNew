import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProcesoEntity } from '../procesos/entities/proceso.entity';

import { ProcesoPersonaEntity } from './entities/proceso-persona.entity';

import { ProcesoPersonasController } from './proceso-personas.controller';
import { ProcesoPersonasService } from './proceso-personas.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProcesoPersonaEntity, ProcesoEntity])],
  controllers: [ProcesoPersonasController],
  providers: [ProcesoPersonasService],
  exports: [ProcesoPersonasService],
})
export class ProcesoPersonasModule {}
