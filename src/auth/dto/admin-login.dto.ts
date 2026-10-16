import { IsEmail, IsNotEmpty , MinLength} from 'class-validator';

export class AdminLoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}