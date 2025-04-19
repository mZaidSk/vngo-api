import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { Certificate } from './entities/certificate.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Activity } from '../activity/entities/activity.entity';
import { VolunteerProfile } from 'src/modules/profile/volunteer-profile/entities/volunteer-profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Application,
      Certificate,
      User,
      Activity,
      VolunteerProfile,
    ]),
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
