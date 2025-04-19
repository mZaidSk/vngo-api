import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Activity } from '../../activity/entities/activity.entity';
import { VolunteerProfile } from 'src/modules/profile/volunteer-profile/entities/volunteer-profile.entity';
import { Certificate } from './certificate.entity';

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn('uuid')
  application_id: string;

  @Column({ type: 'uuid' })
  volunteer_profile_id: string;

  @Column({ type: 'uuid' })
  activity_id: string;

  @ManyToOne(() => VolunteerProfile)
  @JoinColumn({ name: 'volunteer_profile_id' })
  volunteerProfile: VolunteerProfile;

  @ManyToOne(() => Activity)
  @JoinColumn({ name: 'activity_id' })
  activity: Activity;

  @Column({ type: 'varchar', length: 50, default: 'PENDING' })
  status: 'PENDING' | 'APPROVED' | 'COMPLETED';

  @Column({ type: 'text', nullable: true })
  message: string;

  // Relationship with Certificate entity
  @ManyToOne(() => Certificate, { nullable: true })
  @JoinColumn({ name: 'certificate_id' })
  certificate: Certificate; // The generated certificate assigned to the application

  @Column({ type: 'uuid', nullable: true })
  certificate_id: string; // This stores the ID of the generated certificate, for querying

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
