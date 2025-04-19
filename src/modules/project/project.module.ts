import { Module } from '@nestjs/common';
import { ActivityModule } from './activity/activity.module';
import { ApplicationModule } from './application/application.module';
import { UsersModule } from '../users/users.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [ActivityModule, ApplicationModule, CommentModule],
  exports: [ActivityModule, ApplicationModule],
})
export class ProjectModule {}
