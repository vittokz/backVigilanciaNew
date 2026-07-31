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

import { HonorariosService } from './honorarios.service';

import { CreateHonorarioDto } from './dto/create-honorario.dto';
import { UpdateHonorarioDto } from './dto/update-honorario.dto';

@Controller('honorarios')
export class HonorariosController {
  constructor(private readonly service: HonorariosService) {}

  @Post()
  create(
    @Body()
    dto: CreateHonorarioDto,
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
    dto: UpdateHonorarioDto,
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
