import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ProcesoEntity } from '../procesos/entities/proceso.entity';

import { CreateActuacionDto } from './dto/create-actuacion.dto';

import { ActuacionEntity } from './entities/actuacione.entity';
import { UpdateActuacionDto } from './dto/update-actuacione.dto';

@Injectable()
export class ActuacionesService {
  constructor(
    @InjectRepository(ActuacionEntity)
    private readonly repository: Repository<ActuacionEntity>,

    @InjectRepository(ProcesoEntity)
    private readonly procesoRepository: Repository<ProcesoEntity>,
  ) {}

  async create(dto: CreateActuacionDto): Promise<ActuacionEntity> {
    const proceso = await this.procesoRepository.findOne({
      where: {
        id: dto.procesoId,
      },
    });

    if (!proceso) {
      throw new NotFoundException('Proceso no encontrado');
    }

    const actuacion = this.repository.create({
      titulo: dto.titulo,
      proveedor: dto.proveedor,
      fecha_actuacion: dto.fecha_actuacion,
      despacho: dto.despacho,
      anotacion: dto.anotacion,
      proceso,
    });

    return this.repository.save(actuacion);
  }

  async findAll(): Promise<ActuacionEntity[]> {
    return this.repository.find({
      relations: {
        proceso: true,
      },
      order: {
        fecha_actuacion: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<ActuacionEntity> {
    const actuacion = await this.repository.findOne({
      where: { id },
      relations: {
        proceso: true,
      },
    });

    if (!actuacion) {
      throw new NotFoundException('Actuación no encontrada');
    }

    return actuacion;
  }

  async findByProceso(procesoId: number): Promise<ActuacionEntity[]> {
    return this.repository.find({
      where: {
        proceso: {
          id: procesoId,
        },
      },
      relations: {
        proceso: true,
      },
      order: {
        fecha_actuacion: 'DESC',
      },
    });
  }

  async update(id: number, dto: UpdateActuacionDto): Promise<ActuacionEntity> {
    const actuacion = await this.findOne(id);

    if (dto.procesoId) {
      const proceso = await this.procesoRepository.findOne({
        where: {
          id: dto.procesoId,
        },
      });

      if (!proceso) {
        throw new NotFoundException('Proceso no encontrado');
      }

      actuacion.proceso = proceso;
    }

    if (dto.titulo !== undefined) {
      actuacion.titulo = dto.titulo;
    }

    if (dto.proveedor !== undefined) {
      actuacion.proveedor = dto.proveedor;
    }

    if (dto.fecha_actuacion !== undefined) {
      actuacion.fecha_actuacion = dto.fecha_actuacion;
    }

    if (dto.despacho !== undefined) {
      actuacion.despacho = dto.despacho;
    }

    if (dto.anotacion !== undefined) {
      actuacion.anotacion = dto.anotacion;
    }

    return this.repository.save(actuacion);
  }

  async remove(id: number): Promise<void> {
    const actuacion = await this.findOne(id);

    await this.repository.remove(actuacion);
  }
}
