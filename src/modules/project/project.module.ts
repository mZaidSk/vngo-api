import { Module } from '@nestjs/common';
import { ActivityModule } from './activity/activity.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [ActivityModule, ApplicationModule]
})
export class ProjectModule {}
