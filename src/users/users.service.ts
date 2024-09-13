import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUsers() {
    const users = await this.prismaService.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return users;
  }

  async getUserById(userId: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: userId,
      },
    });

    return user;
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {}
}
