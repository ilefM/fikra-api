import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllPosts() {
    return await this.prismaService.post.findMany();
  }

  async getPostById(postId: string) {
    return await this.prismaService.post.findFirst({
      where: {
        id: postId,
      },
    });
  }
}
