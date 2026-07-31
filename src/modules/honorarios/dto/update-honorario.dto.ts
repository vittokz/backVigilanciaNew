import { PartialType } from '@nestjs/swagger';
import { CreateHonorarioDto } from './create-honorario.dto';

export class UpdateHonorarioDto extends PartialType(CreateHonorarioDto) {}
