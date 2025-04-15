import { Module } from '@nestjs/common';
import { ActivityModule } from './activity/activity.module';
import { ApplicationModule } from './application/application.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [ActivityModule, ApplicationModule],
  exports: [ActivityModule, ApplicationModule],
})
export class ProjectModule {}
