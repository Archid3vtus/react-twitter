import { IsDateString, IsOptional, IsString } from 'class-validator';

export class ProfileDto {
  @IsString()
  displayName: string;
  @IsDateString()
  birthdate: Date;
  @IsString()
  @IsOptional()
  bio: string;
  @IsString()
  @IsOptional()
  photo: string;
}
