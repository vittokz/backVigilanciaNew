import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateDespachoDto } from './dto/create-despacho.dto';
import { UpdateDespachoDto } from './dto/update-despacho.dto';
import { DespachoEntity } from './entities/despacho.entity';

@Injectable()
export class DespachosService {
  constructor(
    @InjectRepository(DespachoEntity)
    private readonly repository: Repository<DespachoEntity>,
  ) {}

  async create(dto: CreateDespachoDto): Promise<DespachoEntity> {
    const despacho = this.repository.create(dto);

    return this.repository.save(despacho);
  }

  async findAll(): Promise<DespachoEntity[]> {
    return this.repository.find({
      order: {
        nombre: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<DespachoEntity> {
    const despacho = await this.repository.findOne({
      where: { id },
    });

    if (!despacho) {
      throw new NotFoundException('Despacho no encontrado');
    }

    return despacho;
  }

  async update(id: number, dto: UpdateDespachoDto): Promise<DespachoEntity> {
    const despacho = await this.findOne(id);

    Object.assign(despacho, dto);

    return this.repository.save(despacho);
  }

  async remove(id: number): Promise<void> {
    const despacho = await this.findOne(id);

    await this.repository.remove(despacho);
  }
}
