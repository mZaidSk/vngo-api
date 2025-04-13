import { Module } from '@nestjs/common';
import { VolunteerProfileService } from './volunteer-profile.service';
import { VolunteerProfileController } from './volunteer-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VolunteerProfile } from './entities/volunteer-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VolunteerProfile])],
  controllers: [VolunteerProfileController],
  providers: [VolunteerProfileService],
  exports: [VolunteerProfileService],
})
export class VolunteerProfileModule {}
