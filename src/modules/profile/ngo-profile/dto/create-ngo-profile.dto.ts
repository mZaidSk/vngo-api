import {
  IsUUID,
  IsString,
  IsOptional,
  IsArray,
  IsInt,
  IsEmail,
  IsUrl,
  IsPhoneNumber,
  Length,
} from 'class-validator';

export class CreateNgoProfileDto {
  @IsString()
  organization_name: string;

  @IsOptional()
  @IsString()
  mission?: string;

  @IsOptional()
  @IsString()
  focus_areas?: string;

  @IsOptional()
  @IsInt()
  founded_year?: number;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber(undefined)
  phone?: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsOptional()
  @IsString()
  address_line_1?: string;

  @IsOptional()
  @IsString()
  address_line_2?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  @Length(3, 20)
  postal_code?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsUrl()
  twitter?: string;

  @IsOptional()
  @IsUrl()
  instagram?: string;

  @IsOptional()
  @IsUrl()
  linkedin?: string;

  @IsOptional()
  @IsUrl()
  youtube?: string;

  @IsOptional()
  @IsUrl()
  logo_url?: string;

  @IsOptional()
  @IsUrl()
  banner_url?: string;

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  gallery_urls?: string[];
}
