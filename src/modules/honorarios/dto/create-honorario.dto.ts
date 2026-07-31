import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateHonorarioDto {
  @IsNumber()
  procesoId!: number;

  @IsNumber()
  valor!: number;

  @IsOptional()
  @IsString()
  concepto?: string;

  @IsDateString()
  fecha!: Date;

  @IsOptional()
  @IsString()
  observaciones?: string;
}
