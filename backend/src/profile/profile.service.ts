import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfileDto } from './dto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async createProfile(dto: ProfileDto, user: User) {
    const { bio, birthdate, displayName, photo } = dto;

    const userWithProfile = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        profile: {
          create: {
            bio,
            birthdate,
            displayName,
            photo,
          },
        },
      },
      select: {
        id: true,
        email: true,
        username: true,
        profile: true,
      },
    });

    return {
      message: 'profile created',
      userWithProfile,
    };
  }

  async updateProfile(dto: ProfileDto, user: User) {
    const { bio, birthdate, displayName, photo } = dto;

    const userWithProfile = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        profile: {
          update: {
            bio,
            birthdate,
            displayName,
            photo,
          },
        },
      },
      select: {
        id: true,
        email: true,
        username: true,
        profile: true,
      },
    });

    return {
      message: 'profile updated',
      userWithProfile,
    };
  }
}
