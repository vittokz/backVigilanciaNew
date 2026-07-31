import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { EstadoCobro } from '../entities/cobro.entity';

export class CreateCobroDto {
  @IsNumber()
  procesoId!: number;

  @IsNumber()
  valor!: number;

  @IsString()
  concepto!: string;

  @IsDateString()
  fecha!: Date;

  @IsOptional()
  @IsEnum(EstadoCobro)
  estado?: EstadoCobro;
}
