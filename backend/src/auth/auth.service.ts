import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninDto, SignupDto } from './dto';
import { hash, compare as comparePassword } from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: SignupDto) {
    //destructure password
    const { password, email, username } = dto;
    // Generate password hash
    const passwordDigest = await hash(password, 10);

    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          passwordDigest,
          username,
        },
      });

      delete user.passwordDigest;

      return { user };
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException(e);
      }

      throw e;
    }
  }

  async signin(dto: SigninDto) {
    // Find the user by either email or username
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    const emailCheck = dto.username.match(emailRegex);
    const field: 'email' | 'username' =
      emailCheck != null ? 'email' : 'username';

    const foundUser = await this.prisma.user.findFirst({
      where: {
        [field]: dto.username,
      },
    });

    if (!foundUser) {
      throw new ForbiddenException('Incorrect credentials');
    }

    // Compare password
    const passwordCheck = await comparePassword(
      dto.password,
      foundUser.passwordDigest,
    );

    if (!passwordCheck) {
      throw new ForbiddenException('Incorrect credentials');
    }

    return foundUser;
  }
}
