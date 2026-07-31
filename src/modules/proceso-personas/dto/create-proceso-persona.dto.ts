import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { TipoPersonaProceso } from '../entities/proceso-persona.entity';

export class CreateProcesoPersonaDto {
  @IsEnum(TipoPersonaProceso)
  tipo!: TipoPersonaProceso;

  @IsString()
  nombre!: string;

  @IsOptional()
  @IsString()
  identificacion?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsEmail()
  correo?: string;

  @IsNumber()
  procesoId!: number;
}
