import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ArchivoEntity } from './entities/archivo.entity';

import { ProcesoEntity } from '../procesos/entities/proceso.entity';

import { ArchivosController } from './archivos.controller';
import { ArchivosService } from './archivos.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArchivoEntity, ProcesoEntity])],
  controllers: [ArchivosController],
  providers: [ArchivosService],
  exports: [ArchivosService],
})
export class ArchivosModule {}
