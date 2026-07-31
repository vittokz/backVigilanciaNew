import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ComentarioEntity } from './entities/comentario.entity';
import { ProcesoEntity } from '../procesos/entities/proceso.entity';

import { ComentariosController } from './comentarios.controller';
import { ComentariosService } from './comentarios.service';

@Module({
  imports: [TypeOrmModule.forFeature([ComentarioEntity, ProcesoEntity])],
  controllers: [ComentariosController],
  providers: [ComentariosService],
  exports: [ComentariosService],
})
export class ComentariosModule {}
