// src/skills/entities/skill.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  skill_id: string;

  @Column({ unique: true })
  name: string;
}
