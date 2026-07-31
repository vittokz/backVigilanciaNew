import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateProcesoPersonaDto } from './dto/create-proceso-persona.dto';
import { UpdateProcesoPersonaDto } from './dto/update-proceso-persona.dto';

import { ProcesoPersonasService } from './proceso-personas.service';

@Controller('proceso-personas')
export class ProcesoPersonasController {
  constructor(private readonly service: ProcesoPersonasService) {}

  @Post()
  create(
    @Body()
    dto: CreateProcesoPersonaDto,
  ) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('proceso/:id')
  findByProceso(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.service.findByProceso(id);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    dto: UpdateProcesoPersonaDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.service.remove(id);
  }
}
