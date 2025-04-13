import { Module } from '@nestjs/common';
import { VolunteerSkillService } from './volunteer-skill.service';
import { VolunteerSkillController } from './volunteer-skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VolunteerSkill } from './entities/volunteer-skill.entity';
import { VolunteerProfile } from 'src/modules/profile/volunteer-profile/entities/volunteer-profile.entity';
import { Skill } from '../skills/entities/skill.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([VolunteerSkill, VolunteerProfile, Skill]),
  ],
  controllers: [VolunteerSkillController],
  providers: [VolunteerSkillService],
})
export class VolunteerSkillModule {}
