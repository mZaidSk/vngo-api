import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { NGOProfile } from 'src/modules/profile/ngo-profile/entities/ngo-profile.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepo: Repository<Activity>,
    // @InjectRepository(ActivityRegistration)
    // private registrationRepo: Repository<ActivityRegistration>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(NGOProfile)
    private ngoProfileRepo: Repository<NGOProfile>,
  ) {}

  async create(userId: string, dto: CreateActivityDto) {
    if (!userId) {
      throw new NotFoundException('User not found');
    }

    // Assuming the creator is an NGO user
    const ngoProfile = await this.ngoProfileRepo.findOne({
      where: { user_id: userId },
    });

    if (!ngoProfile?.ngo_id) {
      throw new NotFoundException('NGO profile not found!!!');
    }

    const newActivity = this.activityRepo.create({
      ...dto,
      ngoProfile: ngoProfile, // pass the whole entity, not just the ID
    });

    const savedActivity = await this.activityRepo.save(newActivity);

    return savedActivity;
  }

  async findAll() {
    return this.activityRepo.find({
      relations: ['ngoProfile'],
    });
  }

  async findOne(id: string) {
    const activity = await this.activityRepo.findOne({
      where: { id },
      relations: ['ngoProfile', 'comments'],
    });

    if (!activity) throw new NotFoundException('Activity not found');

    // Sort comments by createdAt in descending order
    activity.comments = activity.comments.sort(
      (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
    );

    return activity;
  }

  // async findByNgoId(ngoId: string) {
  //   return this.activityRepo.find({
  //     where: { ngoProfile: { ngo_id: ngoId } },
  //     relations: ['ngo'],
  //   });
  // }

  async findByNgoId(userId: string) {
    if (!userId) {
      throw new NotFoundException('User not found');
    }

    // Assuming the creator is an NGO user
    const ngoProfile = await this.ngoProfileRepo.findOne({
      where: { user_id: userId },
    });

    if (!ngoProfile?.ngo_id) {
      throw new NotFoundException('NGO profile not found!!!');
    }

    const activity = await this.activityRepo.find({
      where: { ngoProfile: { user_id: userId } },
      relations: ['ngoProfile'],
    });

    return activity;
  }

  async findByVolunteerId(userId: string) {}

  async findByUserId(userId: string) {
    // Assuming the creator is an NGO user
    const ngoProfile = await this.ngoProfileRepo.findOne({
      where: { user_id: userId },
      relations: ['ngoProfile'],
    });

    if (!ngoProfile?.ngo_id) {
      throw new NotFoundException('NGO profile not found!!!');
    }

    return this.activityRepo.find({
      where: { ngoProfile: { user: { user_id: userId } } },
      relations: ['ngoProfile'],
    });
  }

  async findUpcomingActivities() {
    const now = new Date();
    return this.activityRepo.find({
      where: { startDate: new Date(now) },
      order: { startDate: 'ASC' },
      relations: ['ngoProfile'],
    });
  }

  async update(id: string, dto: UpdateActivityDto) {
    const activity = await this.findOne(id);
    Object.assign(activity, dto);
    return this.activityRepo.save(activity);
  }

  async remove(id: string) {
    const activity = await this.findOne(id);
    return this.activityRepo.remove(activity);
  }
}
