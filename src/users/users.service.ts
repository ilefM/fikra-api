import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserById(userId: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: userId,
      },
    });

    return user;
  }
}
