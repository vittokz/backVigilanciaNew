import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ComentarioEntity } from './entities/comentario.entity';

import { ProcesoEntity } from '../procesos/entities/proceso.entity';

import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';

@Injectable()
export class ComentariosService {
  constructor(
    @InjectRepository(ComentarioEntity)
    private readonly repository: Repository<ComentarioEntity>,

    @InjectRepository(ProcesoEntity)
    private readonly procesoRepository: Repository<ProcesoEntity>,
  ) {}

  async create(dto: CreateComentarioDto): Promise<ComentarioEntity> {
    const proceso = await this.procesoRepository.findOne({
      where: {
        id: dto.procesoId,
      },
    });

    if (!proceso) {
      throw new NotFoundException('Proceso no encontrado');
    }

    const comentario = this.repository.create({
      comentario: dto.comentario,
      usuarioId: dto.usuarioId,
      proceso,
    });

    return this.repository.save(comentario);
  }

  async findAll() {
    return this.repository.find({
      relations: {
        proceso: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    const comentario = await this.repository.findOne({
      where: { id },
      relations: {
        proceso: true,
      },
    });

    if (!comentario) {
      throw new NotFoundException('Comentario no encontrado');
    }

    return comentario;
  }

  async findByProceso(procesoId: number) {
    return this.repository.find({
      where: {
        proceso: {
          id: procesoId,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async update(
    id: number,
    dto: UpdateComentarioDto,
  ): Promise<ComentarioEntity> {
    const comentario = await this.findOne(id);

    if (dto.comentario !== undefined) {
      comentario.comentario = dto.comentario;
    }

    if (dto.usuarioId !== undefined) {
      comentario.usuarioId = dto.usuarioId;
    }

    return this.repository.save(comentario);
  }

  async remove(id: number) {
    const comentario = await this.findOne(id);

    await this.repository.remove(comentario);
  }
}
