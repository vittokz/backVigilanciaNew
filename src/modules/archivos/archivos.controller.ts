import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';

import { ArchivosService } from './archivos.service';

@Controller('archivos')
export class ArchivosController {
  constructor(private readonly service: ArchivosService) {}

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

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.service.remove(id);
  }
}
