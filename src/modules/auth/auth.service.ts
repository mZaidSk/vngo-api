import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { NgoProfileService } from '../profile/ngo-profile/ngo-profile.service';
import { VolunteerProfileService } from '../profile/volunteer-profile/volunteer-profile.service';
import { MailerServiceS } from './mailer.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private ngoProfileService: NgoProfileService,
    private volunteerProfileService: VolunteerProfileService,
    private readonly mailerService: MailerServiceS,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const profileId = await this.getProfileIdByRole(user.user_id, user.role);

    const payload = { email: user.email, sub: user.user_id, role: user.role };
    const access_token = this.jwtService.sign(payload);

    const { password, ...userWithoutPassword } = user;
    return {
      access_token,
      user: {
        ...userWithoutPassword,
        profile_id: profileId,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    if (registerDto.password !== registerDto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const { confirmPassword, ...userData } = registerDto;
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = await this.usersService.create({
      ...userData,
      password: hashedPassword,
    });

    const profileId = await this.getProfileIdByRole(user.user_id, user.role);

    const payload = { email: user.email, sub: user.user_id, role: user.role };
    const access_token = this.jwtService.sign(payload);

    const { password, ...userWithoutPassword } = user;
    return {
      access_token,
      user: {
        ...userWithoutPassword,
        profile_id: profileId,
      },
    };
  }

  async forgotPassword(email: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User with this email does not exist');
    }

    // Generate a reset token (e.g., short-lived JWT)
    const payload = { email: user.email, sub: user.user_id };
    const token = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });

    // TODO: Send this token via email
    await this.mailerService.sendResetPasswordEmail(user.email, token);

    // For now, return the token
    return {
      message: 'Reset password link has been sent to your email',
      resetToken: token,
    };
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      // Decode the token
      const payload = this.jwtService.verify(token);
      const user = await this.usersService.findByEmail(payload.email);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update password in DB
      await this.usersService.updatePassword(user.user_id, hashedPassword);

      return { message: 'Password has been successfully reset' };
    } catch (err) {
      throw new Error('Invalid or expired reset token');
    }
  }

  async checkUser(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const { password, ...userWithoutPassword } = user;

    let profile = null;

    if (user.role === 'NGO') {
      profile = await this.ngoProfileService.findByUserId(user.user_id);
    } else if (user.role === 'VOLUNTEER') {
      profile = await this.volunteerProfileService.findByUserId(user.user_id);
    }

    return {
      ...userWithoutPassword,
      profile,
    };
  }

  private async getProfileIdByRole(userId: string, role: string) {
    if (role === 'NGO') {
      const ngoProfile = await this.ngoProfileService.findByUserId(userId);
      return ngoProfile;
    } else if (role === 'VOLUNTEER') {
      const volunteerProfile =
        await this.volunteerProfileService.findByUserId(userId);
      return volunteerProfile;
    }
    return null;
  }
}
