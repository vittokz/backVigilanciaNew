import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ProcesoEntity } from '../procesos/entities/proceso.entity';

import { CreateProcesoPersonaDto } from './dto/create-proceso-persona.dto';
import { UpdateProcesoPersonaDto } from './dto/update-proceso-persona.dto';

import { ProcesoPersonaEntity } from './entities/proceso-persona.entity';

@Injectable()
export class ProcesoPersonasService {
  constructor(
    @InjectRepository(ProcesoPersonaEntity)
    private readonly repository: Repository<ProcesoPersonaEntity>,

    @InjectRepository(ProcesoEntity)
    private readonly procesoRepository: Repository<ProcesoEntity>,
  ) {}

  async create(dto: CreateProcesoPersonaDto): Promise<ProcesoPersonaEntity> {
    const proceso = await this.procesoRepository.findOne({
      where: {
        id: dto.procesoId,
      },
    });

    if (!proceso) {
      throw new NotFoundException('Proceso no encontrado');
    }

    const persona = this.repository.create({
      tipo: dto.tipo,
      nombre: dto.nombre,
      identificacion: dto.identificacion,
      telefono: dto.telefono,
      correo: dto.correo,
      proceso,
    });

    return this.repository.save(persona);
  }

  async findAll(): Promise<ProcesoPersonaEntity[]> {
    return this.repository.find({
      relations: {
        proceso: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<ProcesoPersonaEntity> {
    const persona = await this.repository.findOne({
      where: { id },
      relations: {
        proceso: true,
      },
    });

    if (!persona) {
      throw new NotFoundException('Persona no encontrada');
    }

    return persona;
  }

  async findByProceso(procesoId: number): Promise<ProcesoPersonaEntity[]> {
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
        createdAt: 'ASC',
      },
    });
  }

  async update(
    id: number,
    dto: UpdateProcesoPersonaDto,
  ): Promise<ProcesoPersonaEntity> {
    const persona = await this.findOne(id);

    if (dto.procesoId) {
      const proceso = await this.procesoRepository.findOne({
        where: {
          id: dto.procesoId,
        },
      });

      if (!proceso) {
        throw new NotFoundException('Proceso no encontrado');
      }

      persona.proceso = proceso;
    }

    Object.assign(persona, {
      tipo: dto.tipo ?? persona.tipo,
      nombre: dto.nombre ?? persona.nombre,
      identificacion: dto.identificacion ?? persona.identificacion,
      telefono: dto.telefono ?? persona.telefono,
      correo: dto.correo ?? persona.correo,
    });

    return this.repository.save(persona);
  }

  async remove(id: number): Promise<void> {
    const persona = await this.findOne(id);

    await this.repository.remove(persona);
  }
}
