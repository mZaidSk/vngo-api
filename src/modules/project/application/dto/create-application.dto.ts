import { IsUUID, IsString, IsOptional, IsIn } from 'class-validator';

export class CreateApplicationDto {
  @IsUUID()
  volunteer_profile_id: string;

  @IsUUID()
  activity_id: string;

  @IsIn(['PENDING', 'APPROVED', 'COMPLETED'])
  status: 'PENDING' | 'APPROVED' | 'COMPLETED';

  @IsString()
  @IsOptional()
  message?: string;
}
