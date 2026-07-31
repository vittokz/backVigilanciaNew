import { IsNumber, IsString } from 'class-validator';

export class CreateComentarioDto {
  @IsNumber()
  procesoId!: number;

  @IsString()
  comentario!: string;

  @IsNumber()
  usuarioId!: number;
}
