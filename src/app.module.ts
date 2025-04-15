import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/users/entities/user.entity';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { VolunteerProfile } from './modules/profile/volunteer-profile/entities/volunteer-profile.entity';
import { NGOProfile } from './modules/profile/ngo-profile/entities/ngo-profile.entity';
import { ProfileModule } from './modules/profile/profile.module';
import { QualificationsModule } from './modules/qualifications/qualifications.module';
import { ProjectModule } from './modules/project/project.module';
import { Skill } from './modules/qualifications/skills/entities/skill.entity';
import { VolunteerSkill } from './modules/qualifications/volunteer-skill/entities/volunteer-skill.entity';
import { Activity } from './modules/project/activity/entities/activity.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'root',
      username: 'postgres',
      entities: [
        User,
        VolunteerProfile,
        NGOProfile,
        Skill,
        VolunteerSkill,
        Activity,
      ],
      database: 'vngo_db',
      synchronize: true,
      logging: true,
    }),
    AuthModule,
    UsersModule,
    ProfileModule,
    QualificationsModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
