import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ProfileDto } from './dto';
import { User } from 'src/auth/decorator';
import { ProfileService } from './profile.service';
import { JwtGuard } from 'src/auth/guard';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post('create')
  @UseGuards(JwtGuard)
  createProfile(@Body() dto: ProfileDto, @User() user) {
    return this.profileService.createProfile(dto, user);
  }

  @Post('update')
  @UseGuards(JwtGuard)
  updateProfile(@Body() dto: ProfileDto, @User() user) {
    return this.profileService.updateProfile(dto, user);
  }
}
