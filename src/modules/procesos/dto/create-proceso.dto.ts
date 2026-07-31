import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProcesoDto {
  @IsString()
  numeroRadicado!: string;

  @IsString()
  jurisdiccion!: string;

  @IsString()
  tipoProceso!: string;

  @IsOptional()
  @IsString()
  etapaProcesal?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  tipoCliente?: string;

  @IsOptional()
  @IsNumber()
  abogadoId?: number;

  @IsDateString()
  fechaRadicado!: Date;

  @IsOptional()
  @IsNumber()
  cuantia?: number;

  @IsNumber()
  despachoId!: number;
}
