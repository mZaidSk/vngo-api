import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NGOProfile } from './entities/ngo-profile.entity';
import { CreateNgoProfileDto } from './dto/create-ngo-profile.dto';
import { UpdateNgoProfileDto } from './dto/update-ngo-profile.dto';

@Injectable()
export class NgoProfileService {
  constructor(
    @InjectRepository(NGOProfile)
    private repo: Repository<NGOProfile>,
  ) {}

  create(userId, dto: CreateNgoProfileDto) {
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
      where: { ngo_id: id },
      relations: ['user', 'activities'],
    });
    if (!profile) throw new NotFoundException('NGO Profile not found');
    return profile;
  }

  async findByUserId(userId: string) {
    return this.repo.findOne({
      where: { user: { user_id: userId } },
      relations: ['activities'],
    });
  }

  async update(id: string, dto: UpdateNgoProfileDto) {
    const profile = await this.findOne(id);
    Object.assign(profile, dto);
    return this.repo.save(profile);
  }

  async remove(id: string) {
    const profile = await this.findOne(id);
    return this.repo.remove(profile);
  }
}
