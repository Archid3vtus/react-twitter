import { IsDateString, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  displayname: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsDateString()
  birthdate: Date;

  @IsString()
  photo: string;
}
