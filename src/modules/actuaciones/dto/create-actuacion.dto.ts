import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateActuacionDto {
  @IsNumber()
  procesoId!: number;

  @IsString()
  titulo!: string;

  @IsOptional()
  @IsString()
  proveedor?: string;

  @IsDateString()
  fecha_actuacion!: Date;

  @IsOptional()
  @IsString()
  despacho?: string;

  @IsOptional()
  @IsString()
  anotacion?: string;
}
