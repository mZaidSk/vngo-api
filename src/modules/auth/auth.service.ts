import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { NgoProfileService } from '../profile/ngo-profile/ngo-profile.service';
import { VolunteerProfileService } from '../profile/volunteer-profile/volunteer-profile.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private ngoProfileService: NgoProfileService,
    private volunteerProfileService: VolunteerProfileService,
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
