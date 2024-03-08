import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FollowerService } from './follower.service';
import { JwtGuard } from 'src/auth/guard';
import { User } from 'src/auth/decorator';

@Controller('follower')
export class FollowerController {
  constructor(private follower: FollowerService) {}

  @Post('/follow/:username')
  @UseGuards(JwtGuard)
  followUser(@Param('username') username: string, @User() user) {
    return this.follower.followUser(username, user);
  }

  @Delete('/unfollow/:username')
  @UseGuards(JwtGuard)
  unfollowUser(@Param('username') username: string, @User() user) {
    return this.follower.unfollowUser(username, user);
  }

  @Get('followingme')
  @UseGuards(JwtGuard)
  getFollowers(@User() user) {
    return this.follower.getFollowers(user);
  }

  @Get('whoifollow')
  @UseGuards(JwtGuard)
  getFollowed(@User() user) {
    return this.follower.getFollowed(user);
  }
}
