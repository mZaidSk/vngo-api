import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/auth.constants';
import { ProfileModule } from '../profile/profile.module';
import { MailerServiceS } from './mailer.service';

@Module({
  imports: [
    UsersModule,
    ProfileModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, MailerServiceS],
  exports: [AuthService],
})
export class AuthModule {}
