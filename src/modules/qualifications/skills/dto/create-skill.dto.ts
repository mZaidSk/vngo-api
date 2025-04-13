// src/skills/dto/create-skill.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSkillDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
