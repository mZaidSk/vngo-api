import { IsEmail, IsString, MinLength } from 'class-validator';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export class RegisterDto extends CreateUserDto {
  @IsString()
  confirmPassword: string;
}
