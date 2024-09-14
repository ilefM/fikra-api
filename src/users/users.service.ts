import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

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

    if (!user) {
      throw new NotFoundException("This user doesn't exist");
    }

    return user;
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    let user: User;
    try {
      user = await this.prismaService.user.update({
        where: {
          id: userId,
        },
        data: updateUserDto,
      });
    } catch (e) {
      throw new NotFoundException("This user doesn't exist");
    }

    return user;
  }

  async deleteUser(userId: string) {
    await this.prismaService.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
