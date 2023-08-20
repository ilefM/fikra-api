import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  DEFAULT_AUTHOR = 'binary_dev';

  constructor(private readonly prismaService: PrismaService) {}

  async getAllPosts() {
    const posts = await this.prismaService.post.findMany();

    return posts;
  }

  async getPostById(postId: string) {
    const post = await this.prismaService.post.findFirst({
      where: {
        id: postId,
      },
    });

    return post;
  }

  async createPost(createPostDto: CreatePostDto) {
    const post = await this.prismaService.post.create({
      data: {
        author: this.DEFAULT_AUTHOR,
        ...createPostDto,
      },
    });

    return post;
  }

  async updatePost(postId: string, updatePostDto: UpdatePostDto) {
    const post = await this.prismaService.post.update({
      where: {
        id: postId,
      },
      data: { author: this.DEFAULT_AUTHOR, ...updatePostDto },
    });

    return post;
  }

  async deletePost(postId: string) {
    await this.prismaService.post.delete({
      where: {
        id: postId,
      },
    });
  }
}
