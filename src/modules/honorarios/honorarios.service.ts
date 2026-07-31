import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HonorarioEntity } from './entities/honorario.entity';
import { ProcesoEntity } from '../procesos/entities/proceso.entity';

import { CreateHonorarioDto } from './dto/create-honorario.dto';
import { UpdateHonorarioDto } from './dto/update-honorario.dto';

@Injectable()
export class HonorariosService {
  constructor(
    @InjectRepository(HonorarioEntity)
    private readonly repository: Repository<HonorarioEntity>,

    @InjectRepository(ProcesoEntity)
    private readonly procesoRepository: Repository<ProcesoEntity>,
  ) {}

  async create(dto: CreateHonorarioDto): Promise<HonorarioEntity> {
    const proceso = await this.procesoRepository.findOne({
      where: {
        id: dto.procesoId,
      },
    });

    if (!proceso) {
      throw new NotFoundException('Proceso no encontrado');
    }

    const honorario = this.repository.create({
      valor: dto.valor,
      concepto: dto.concepto,
      fecha: dto.fecha,
      observaciones: dto.observaciones,
      proceso,
    });

    return this.repository.save(honorario);
  }

  async findAll(): Promise<HonorarioEntity[]> {
    return this.repository.find({
      relations: {
        proceso: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<HonorarioEntity> {
    const honorario = await this.repository.findOne({
      where: { id },
      relations: {
        proceso: true,
      },
    });

    if (!honorario) {
      throw new NotFoundException('Honorario no encontrado');
    }

    return honorario;
  }

  async findByProceso(procesoId: number): Promise<HonorarioEntity[]> {
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
        fecha: 'DESC',
      },
    });
  }

  async update(id: number, dto: UpdateHonorarioDto): Promise<HonorarioEntity> {
    const honorario = await this.findOne(id);

    if (dto.valor !== undefined) {
      honorario.valor = dto.valor;
    }

    if (dto.concepto !== undefined) {
      honorario.concepto = dto.concepto;
    }

    if (dto.fecha !== undefined) {
      honorario.fecha = dto.fecha;
    }

    if (dto.observaciones !== undefined) {
      honorario.observaciones = dto.observaciones;
    }

    return this.repository.save(honorario);
  }

  async remove(id: number): Promise<void> {
    const honorario = await this.findOne(id);

    await this.repository.remove(honorario);
  }
}
