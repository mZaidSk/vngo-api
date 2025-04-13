import { VolunteerSkill } from 'src/modules/qualifications/volunteer-skill/entities/volunteer-skill.entity';
import { User } from 'src/modules/users/entities/user.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('volunteer_profiles')
export class VolunteerProfile {
  @PrimaryGeneratedColumn('uuid')
  profile_id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => VolunteerSkill, (vs) => vs.profile, { cascade: true })
  volunteerSkills: VolunteerSkill[];

  @Column({ type: 'jsonb', nullable: true })
  availability: any;

  @Column({ type: 'jsonb', nullable: true })
  interests: any;

  @Column({ type: 'text', nullable: true })
  past_experience: string;
}
