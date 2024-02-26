import { IsEmail, IsString } from 'class-validator';

export class SignupDto {
  @IsString()
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
