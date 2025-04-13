import { PartialType } from '@nestjs/mapped-types';
import { CreateNgoProfileDto } from './create-ngo-profile.dto';

export class UpdateNgoProfileDto extends PartialType(CreateNgoProfileDto) {}
