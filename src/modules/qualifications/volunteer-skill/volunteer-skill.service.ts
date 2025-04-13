// src/volunteer-skills/volunteer-skills.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VolunteerSkill } from './entities/volunteer-skill.entity';
import { CreateVolunteerSkillDto } from './dto/create-volunteer-skill.dto';
import { UpdateVolunteerSkillDto } from './dto/update-volunteer-skill.dto';
import { VolunteerProfile } from 'src/modules/profile/volunteer-profile/entities/volunteer-profile.entity';
import { Skill } from '../skills/entities/skill.entity';

@Injectable()
export class VolunteerSkillService {
  constructor(
    @InjectRepository(VolunteerSkill)
    private readonly volunteerSkillRepo: Repository<VolunteerSkill>,
    @InjectRepository(VolunteerProfile)
    private readonly profileRepo: Repository<VolunteerProfile>,
    @InjectRepository(Skill)
    private readonly skillRepo: Repository<Skill>,
  ) {}

  async create(dto: CreateVolunteerSkillDto): Promise<VolunteerSkill> {
    const profile = await this.profileRepo.findOne({
      where: { profile_id: dto.profile_id },
    });
    const skill = await this.skillRepo.findOne({
      where: { skill_id: dto.skill_id },
    });

    if (!profile || !skill)
      throw new NotFoundException('Profile or Skill not found');

    const volunteerSkill = this.volunteerSkillRepo.create({ profile, skill });
    return this.volunteerSkillRepo.save(volunteerSkill);
  }

  findAll(): Promise<VolunteerSkill[]> {
    return this.volunteerSkillRepo.find({ relations: ['profile', 'skill'] });
  }

  async findOne(id: string): Promise<VolunteerSkill> {
    const vs = await this.volunteerSkillRepo.findOne({
      where: { volunteer_skill_id: id },
      relations: ['profile', 'skill'],
    });
    if (!vs) throw new NotFoundException('VolunteerSkill not found');
    return vs;
  }

  async update(
    id: string,
    dto: UpdateVolunteerSkillDto,
  ): Promise<VolunteerSkill> {
    const vs = await this.findOne(id);

    if (dto.profile_id) {
      const profile = await this.profileRepo.findOne({
        where: { profile_id: dto.profile_id },
      });
      if (!profile) throw new NotFoundException('Profile not found');
      vs.profile = profile;
    }

    if (dto.skill_id) {
      const skill = await this.skillRepo.findOne({
        where: { skill_id: dto.skill_id },
      });
      if (!skill) throw new NotFoundException('Skill not found');
      vs.skill = skill;
    }

    return this.volunteerSkillRepo.save(vs);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.volunteerSkillRepo.delete(id);
  }
}
