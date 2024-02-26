import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    const { displayname, ...dto } = createUserDto;
    return `this will create the user ${displayname} with the params \n\n ${JSON.stringify(dto, null, 2)}`;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
