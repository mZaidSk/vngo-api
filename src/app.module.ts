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
import { ProjectModule } from './modules/project/project.module';
import { Activity } from './modules/project/activity/entities/activity.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { Application } from './modules/project/application/entities/application.entity';
import { Certificate } from './modules/project/application/entities/certificate.entity';
import { Comment } from './modules/project/comment/entities/comment.entity';

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
        Activity,
        Application,
        Certificate,
        Comment,
      ],
      database: 'vngo_db',
      synchronize: true,
      logging: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, 'certificates'), // points to dist/certificates at runtime
      serveRoot: '/certificates', // exposed route: /certificates/filename.pdf
    }),

    AuthModule,
    UsersModule,
    ProfileModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
