import { IsNumber, IsString } from 'class-validator';

export class CreateArchivoDto {
  @IsNumber()
  procesoId!: number;

  @IsString()
  nombre!: string;

  @IsString()
  nombreOriginal!: string;

  @IsString()
  ruta!: string;

  @IsString()
  extension!: string;

  @IsString()
  mimeType!: string;

  @IsNumber()
  tamanio!: number;
}
