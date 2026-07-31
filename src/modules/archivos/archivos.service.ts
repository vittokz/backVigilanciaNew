import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ArchivoEntity } from './entities/archivo.entity';

import { ProcesoEntity } from '../procesos/entities/proceso.entity';

@Injectable()
export class ArchivosService {
  constructor(
    @InjectRepository(ArchivoEntity)
    private readonly repository: Repository<ArchivoEntity>,

    @InjectRepository(ProcesoEntity)
    private readonly procesoRepository: Repository<ProcesoEntity>,
  ) {}

  async create(data: Partial<ArchivoEntity>) {
    const proceso = await this.procesoRepository.findOne({
      where: {
        id: data.proceso?.id,
      },
    });

    if (!proceso) {
      throw new NotFoundException('Proceso no encontrado');
    }

    const archivo = this.repository.create({
      ...data,
      proceso,
    });

    return this.repository.save(archivo);
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
    const archivo = await this.repository.findOne({
      where: { id },
      relations: {
        proceso: true,
      },
    });

    if (!archivo) {
      throw new NotFoundException('Archivo no encontrado');
    }

    return archivo;
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

  async remove(id: number) {
    const archivo = await this.findOne(id);

    await this.repository.remove(archivo);
  }
}
