// src/volunteer-skills/dto/create-volunteer-skill.dto.ts
import { IsUUID } from 'class-validator';

export class CreateVolunteerSkillDto {
  @IsUUID()
  profile_id: string;

  @IsUUID()
  skill_id: string;
}
