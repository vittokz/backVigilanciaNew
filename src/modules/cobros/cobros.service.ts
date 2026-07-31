import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CobroEntity } from './entities/cobro.entity';
import { ProcesoEntity } from '../procesos/entities/proceso.entity';

import { CreateCobroDto } from './dto/create-cobro.dto';
import { UpdateCobroDto } from './dto/update-cobro.dto';

@Injectable()
export class CobrosService {
  constructor(
    @InjectRepository(CobroEntity)
    private readonly repository: Repository<CobroEntity>,

    @InjectRepository(ProcesoEntity)
    private readonly procesoRepository: Repository<ProcesoEntity>,
  ) {}

  async create(dto: CreateCobroDto): Promise<CobroEntity> {
    const proceso = await this.procesoRepository.findOne({
      where: {
        id: dto.procesoId,
      },
    });

    if (!proceso) {
      throw new NotFoundException('Proceso no encontrado');
    }

    const cobro = this.repository.create({
      valor: dto.valor,
      concepto: dto.concepto,
      fecha: dto.fecha,
      estado: dto.estado,
      proceso,
    });

    return this.repository.save(cobro);
  }

  async findAll(): Promise<CobroEntity[]> {
    return this.repository.find({
      relations: {
        proceso: true,
      },
      order: {
        fecha: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<CobroEntity> {
    const cobro = await this.repository.findOne({
      where: { id },
      relations: {
        proceso: true,
      },
    });

    if (!cobro) {
      throw new NotFoundException('Cobro no encontrado');
    }

    return cobro;
  }

  async findByProceso(procesoId: number): Promise<CobroEntity[]> {
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

  async update(id: number, dto: UpdateCobroDto): Promise<CobroEntity> {
    const cobro = await this.findOne(id);

    if (dto.valor !== undefined) {
      cobro.valor = dto.valor;
    }

    if (dto.concepto !== undefined) {
      cobro.concepto = dto.concepto;
    }

    if (dto.fecha !== undefined) {
      cobro.fecha = dto.fecha;
    }

    if (dto.estado !== undefined) {
      cobro.estado = dto.estado;
    }

    return this.repository.save(cobro);
  }

  async remove(id: number): Promise<void> {
    const cobro = await this.findOne(id);

    await this.repository.remove(cobro);
  }
}
