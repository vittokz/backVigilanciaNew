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

import { ActuacionesService } from './actuaciones.service';

import { CreateActuacionDto } from './dto/create-actuacion.dto';
import { UpdateActuacionDto } from './dto/update-actuacione.dto';

@Controller('actuaciones')
export class ActuacionesController {
  constructor(private readonly service: ActuacionesService) {}

  @Post()
  create(
    @Body()
    dto: CreateActuacionDto,
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
    dto: UpdateActuacionDto,
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
