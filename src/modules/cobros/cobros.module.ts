import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CobroEntity } from './entities/cobro.entity';
import { ProcesoEntity } from '../procesos/entities/proceso.entity';

import { CobrosController } from './cobros.controller';
import { CobrosService } from './cobros.service';

@Module({
  imports: [TypeOrmModule.forFeature([CobroEntity, ProcesoEntity])],
  controllers: [CobrosController],
  providers: [CobrosService],
  exports: [CobrosService],
})
export class CobrosModule {}
