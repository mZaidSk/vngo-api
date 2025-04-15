import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsDateString,
  IsTimeZone,
  IsInt,
  IsArray,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class CreateActivityDto {
  // Basic Info
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(['Upcoming', 'Ongoing', 'Completed', 'Cancelled'])
  @IsOptional()
  status?: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';

  // About The Activity
  @IsString()
  @IsNotEmpty()
  detailedDescription: string;

  @IsString()
  @IsOptional()
  goalsHighlights?: string;

  @IsString()
  @IsOptional()
  pastEvents?: string;

  // Schedule
  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  endTime: string;

  @IsTimeZone()
  @IsNotEmpty()
  timezone: string;

  @IsString()
  @IsOptional()
  duration?: string;

  // Location
  @IsString()
  @IsNotEmpty()
  venueName: string;

  @IsString()
  @IsNotEmpty()
  fullAddress: string;

  @IsUrl()
  @IsOptional()
  googleMapsUrl?: string;

  // Gallery & Media
  @IsUrl()
  @IsOptional()
  image1?: string;

  @IsUrl()
  @IsOptional()
  image2?: string;

  @IsUrl()
  @IsOptional()
  image3?: string;

  @IsUrl()
  @IsOptional()
  bannerImage?: string;

  // Requirements
  @IsInt()
  @IsNotEmpty()
  totalSpots: number;

  @IsInt()
  @IsOptional()
  spotsLeft?: number;

  @IsInt()
  @IsOptional()
  minAge?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  skills?: string[];

  // Rules & Guidelines
  @IsString()
  @IsOptional()
  whatToBring?: string;

  @IsString()
  @IsOptional()
  safetyMeasures?: string;

  @IsString()
  @IsOptional()
  weatherAdvisory?: string;
}
