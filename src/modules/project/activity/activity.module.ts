import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { UsersModule } from 'src/modules/users/users.module';
import { NgoProfileModule } from 'src/modules/profile/ngo-profile/ngo-profile.module';
import { UsersService } from 'src/modules/users/users.service';
import { NgoProfileService } from 'src/modules/profile/ngo-profile/ngo-profile.service';
import { User } from 'src/modules/users/entities/user.entity';
import { NGOProfile } from 'src/modules/profile/ngo-profile/entities/ngo-profile.entity';
import { Comment } from '../comment/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Activity, User, NGOProfile, Comment]),
    UsersModule,
    NgoProfileModule,
  ],
  controllers: [ActivityController],
  providers: [ActivityService],
  exports: [ActivityService],
})
export class ActivityModule {}
