import { PartialType } from '@nestjs/swagger';
import { CreateComentDto } from './create-coment.dto';

export class UpdateComentDto extends PartialType(CreateComentDto) {}
