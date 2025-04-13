import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsDateString,
  Length,
} from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @Length(2, 100)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 100)
  password: string;

  @IsOptional()
  @IsDateString()
  dob?: string; // ISO date string like '1990-01-01'

  @IsEnum(UserRole)
  role: UserRole;
}
