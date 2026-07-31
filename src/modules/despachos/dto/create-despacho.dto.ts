import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateDespachoDto {
  @IsString()
  @MaxLength(100)
  tipo!: string;

  @IsString()
  @MaxLength(500)
  nombre!: string;

  @IsString()
  @MaxLength(150)
  ciudad!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  direccion?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  telefono?: string;

  @IsOptional()
  @IsEmail()
  correo?: string;
}
