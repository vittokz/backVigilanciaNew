import { PartialType } from '@nestjs/swagger';
import { CreateProcesoPersonaDto } from './create-proceso-persona.dto';

export class UpdateProcesoPersonaDto extends PartialType(
  CreateProcesoPersonaDto,
) {}
