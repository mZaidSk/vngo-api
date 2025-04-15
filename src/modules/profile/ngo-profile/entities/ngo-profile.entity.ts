import { Activity } from 'src/modules/project/activity/entities/activity.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('ngo_profiles')
export class NGOProfile {
  @PrimaryGeneratedColumn('uuid')
  ngo_id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', length: 255 })
  organization_name: string;

  @Column({ type: 'text', nullable: true })
  mission: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  focus_areas: string;

  @Column({ type: 'int', nullable: true })
  founded_year: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  website: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address_line_1: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address_line_2: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  state: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  postal_code: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  twitter: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  instagram: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  linkedin: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  youtube: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  logo_url: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  banner_url: string;

  @Column({ type: 'text', array: true, nullable: true })
  gallery_urls: string[];

  @OneToMany(() => Activity, (activity) => activity.ngoProfile)
  activities: Activity[];
}
