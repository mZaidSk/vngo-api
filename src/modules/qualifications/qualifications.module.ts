import { Module } from '@nestjs/common';
import { VolunteerSkillModule } from './volunteer-skill/volunteer-skill.module';
import { CertificateModule } from './certificate/certificate.module';
import { SkillsModule } from './skills/skills.module';

@Module({
  imports: [VolunteerSkillModule, CertificateModule, SkillsModule],
})
export class QualificationsModule {}
