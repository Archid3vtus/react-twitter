import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FollowerService {
  constructor(private prisma: PrismaService) {}

  async followUser(usernameToFollow: string, user: User) {
    // receive a userId
    // check if user exists in the database
    const userToFollow = await this.prisma.user.findUnique({
      where: {
        username: usernameToFollow,
      },
    });

    if (!userToFollow) {
      throw new NotFoundException('No user with that username');
    }

    if (userToFollow.id === user.id) {
      throw new ForbiddenException('Cannot follow yourself');
    }

    // associate directly with id from auth
    try {
      const relationship = await this.prisma.followerRelationship.create({
        data: {
          followerId: user.id,
          followedId: userToFollow.id,
        },
      });

      // answer with new relationship
      return {
        msg: 'followed!',
        relationship,
      };
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('You already follow this user');
      }

      throw e;
    }
  }

  async unfollowUser(usernameToUnfollow: string, user: User) {
    const userToUnfollow = await this.prisma.user.findUnique({
      where: {
        username: usernameToUnfollow,
      },
      select: {
        id: true,
      },
    });

    if (!userToUnfollow) {
      throw new NotFoundException('No user with that username');
    }

    if (userToUnfollow.id === user.id) {
      throw new ForbiddenException('Cannot unfollow yourself');
    }

    const { count } = await this.prisma.followerRelationship.deleteMany({
      where: {
        followerId: user.id,
        followedId: userToUnfollow.id,
      },
    });

    if (count === 0) {
      return {
        msg: 'No one to unfollow',
        count,
      };
    }

    return {
      msg: 'Unfollowed!',
      count,
    };
  }

  async getFollowers(user: User) {
    // from the authorized user
    // get user with follower relationship
    const userWithFollowers = await this.prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        username: true,
        followed: {
          select: {
            follower: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });

    // answer with followers
    return userWithFollowers;
  }

  async getFollowed(user: User) {
    const userWithFollowed = await this.prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        username: true,
        follower: {
          select: {
            followed: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });

    return userWithFollowed;
  }
}
