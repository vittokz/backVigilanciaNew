import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateProcesoDto } from './dto/create-proceso.dto';
import { UpdateProcesoDto } from './dto/update-proceso.dto';

import { ProcesoEntity } from './entities/proceso.entity';

import { DespachoEntity } from '../despachos/entities/despacho.entity';

@Injectable()
export class ProcesosService {
  constructor(
    @InjectRepository(ProcesoEntity)
    private readonly procesoRepository: Repository<ProcesoEntity>,

    @InjectRepository(DespachoEntity)
    private readonly despachoRepository: Repository<DespachoEntity>,
  ) {}

  async create(dto: CreateProcesoDto): Promise<ProcesoEntity> {
    const despacho = await this.despachoRepository.findOne({
      where: {
        id: dto.despachoId,
      },
    });

    if (!despacho) {
      throw new NotFoundException(
        `No existe un despacho con id ${dto.despachoId}`,
      );
    }

    const proceso = this.procesoRepository.create({
      numeroRadicado: dto.numeroRadicado,
      jurisdiccion: dto.jurisdiccion,
      tipoProceso: dto.tipoProceso,
      etapaProcesal: dto.etapaProcesal,
      descripcion: dto.descripcion,
      fechaRadicado: dto.fechaRadicado,
      cuantia: dto.cuantia,
      despacho,
    });

    return this.procesoRepository.save(proceso);
  }

  async findAll(): Promise<ProcesoEntity[]> {
    return this.procesoRepository.find({
      relations: {
        despacho: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<ProcesoEntity> {
    const proceso = await this.procesoRepository.findOne({
      where: { id },
      relations: {
        despacho: true,
      },
    });

    if (!proceso) {
      throw new NotFoundException(`Proceso ${id} no encontrado`);
    }

    return proceso;
  }

  async update(id: number, dto: UpdateProcesoDto): Promise<ProcesoEntity> {
    const proceso = await this.findOne(id);

    if (dto.despachoId) {
      const despacho = await this.despachoRepository.findOne({
        where: {
          id: dto.despachoId,
        },
      });

      if (!despacho) {
        throw new NotFoundException(
          `No existe un despacho con id ${dto.despachoId}`,
        );
      }

      proceso.despacho = despacho;
    }

    if (dto.numeroRadicado !== undefined) {
      proceso.numeroRadicado = dto.numeroRadicado;
    }

    if (dto.jurisdiccion !== undefined) {
      proceso.jurisdiccion = dto.jurisdiccion;
    }

    if (dto.tipoProceso !== undefined) {
      proceso.tipoProceso = dto.tipoProceso;
    }

    if (dto.etapaProcesal !== undefined) {
      proceso.etapaProcesal = dto.etapaProcesal;
    }

    if (dto.descripcion !== undefined) {
      proceso.descripcion = dto.descripcion;
    }

    if (dto.fechaRadicado !== undefined) {
      proceso.fechaRadicado = dto.fechaRadicado;
    }

    if (dto.cuantia !== undefined) {
      proceso.cuantia = dto.cuantia;
    }

    return this.procesoRepository.save(proceso);
  }

  async remove(id: number): Promise<void> {
    const proceso = await this.findOne(id);

    await this.procesoRepository.remove(proceso);
  }
}
