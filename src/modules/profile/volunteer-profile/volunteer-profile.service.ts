import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVolunteerProfileDto } from './dto/create-volunteer-profile.dto';
import { UpdateVolunteerProfileDto } from './dto/update-volunteer-profile.dto';
import { VolunteerProfile } from './entities/volunteer-profile.entity';

@Injectable()
export class VolunteerProfileService {
  constructor(
    @InjectRepository(VolunteerProfile)
    private repo: Repository<VolunteerProfile>,
  ) {}

  create(userId: string, dto: CreateVolunteerProfileDto) {
    if (!userId) {
      throw new NotFoundException('User not found');
    }

    return this.repo.save({
      user_id: userId,
      ...dto,
    });
  }

  findAll() {
    return this.repo.find({ relations: ['user'] });
  }

  async findOne(id: string) {
    const profile = await this.repo.findOne({
      where: { profile_id: id },
      relations: ['user'],
    });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  async findByUserId(userId: string) {
    return this.repo.findOne({ where: { user: { user_id: userId } } });
  }

  async update(id: string, dto: UpdateVolunteerProfileDto) {
    const profile = await this.findOne(id);
    Object.assign(profile, dto);
    return this.repo.save(profile);
  }

  async remove(id: string) {
    const profile = await this.findOne(id);
    return this.repo.remove(profile);
  }
}
