import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DespachoEntity } from './entities/despacho.entity';
import { DespachosController } from './despachos.controller';
import { DespachosService } from './despachos.service';

@Module({
  imports: [TypeOrmModule.forFeature([DespachoEntity])],
  controllers: [DespachosController],
  providers: [DespachosService],
  exports: [DespachosService],
})
export class DespachosModule {}
