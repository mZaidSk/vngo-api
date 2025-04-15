import { NGOProfile } from 'src/modules/profile/ngo-profile/entities/ngo-profile.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Basic Info
  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'],
    default: 'Upcoming',
  })
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';

  // Relationship to NgoProfile
  @ManyToOne(() => NGOProfile, (ngo) => ngo.activities)
  @JoinColumn({ name: 'ngo_id' })
  ngoProfile: NGOProfile;

  // About The Activity
  @Column({ name: 'detailed_description', type: 'text' })
  detailedDescription: string;

  @Column({ name: 'goals_highlights', type: 'text', nullable: true })
  goalsHighlights: string;

  @Column({ name: 'past_events', type: 'text', nullable: true })
  pastEvents: string;

  // Schedule
  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date' })
  endDate: Date;

  @Column({ name: 'start_time', type: 'time' })
  startTime: string;

  @Column({ name: 'end_time', type: 'time' })
  endTime: string;

  @Column()
  timezone: string;

  @Column({ nullable: true })
  duration: string;

  // Location
  @Column({ name: 'venue_name' })
  venueName: string;

  @Column({ name: 'full_address', type: 'text' })
  fullAddress: string;

  @Column({ name: 'google_maps_url', nullable: true })
  googleMapsUrl: string;

  // Gallery & Media
  @Column({ name: 'image1', nullable: true })
  image1: string;

  @Column({ name: 'image2', nullable: true })
  image2: string;

  @Column({ name: 'image3', nullable: true })
  image3: string;

  @Column({ name: 'banner_image', nullable: true })
  bannerImage: string;

  // Requirements
  @Column({ name: 'total_spots', type: 'int' })
  totalSpots: number;

  @Column({ name: 'spots_left', type: 'int' })
  spotsLeft: number;

  @Column({ name: 'min_age', type: 'int', nullable: true })
  minAge: number;

  @Column('simple-array', { nullable: true })
  skills: string[];

  // Rules & Guidelines
  @Column({ name: 'what_to_bring', type: 'text', nullable: true })
  whatToBring: string;

  @Column({ name: 'safety_measures', type: 'text', nullable: true })
  safetyMeasures: string;

  @Column({ name: 'weather_advisory', type: 'text', nullable: true })
  weatherAdvisory: string;

  // Timestamps
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor(partial?: Partial<Activity>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
