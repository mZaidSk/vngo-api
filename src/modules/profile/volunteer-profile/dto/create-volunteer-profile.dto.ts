import { IsUUID, IsOptional, IsJSON, IsString } from 'class-validator';

export class CreateVolunteerProfileDto {
  @IsOptional()
  availability?: any;

  @IsOptional()
  interests?: any;

  @IsOptional()
  @IsString()
  past_experience?: string;
}
