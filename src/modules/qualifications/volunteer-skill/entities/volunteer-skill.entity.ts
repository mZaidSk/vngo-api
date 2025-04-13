// src/volunteer-skills/entities/volunteer-skill.entity.ts
import { VolunteerProfile } from 'src/modules/profile/volunteer-profile/entities/volunteer-profile.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Skill } from '../../skills/entities/skill.entity';

@Entity()
export class VolunteerSkill {
  @PrimaryGeneratedColumn('uuid')
  volunteer_skill_id: string;

  @ManyToOne(() => VolunteerProfile, (profile) => profile.volunteerSkills, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'profile_id' })
  profile: VolunteerProfile;

  @ManyToOne(() => Skill, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'skill_id' })
  skill: Skill;
}
