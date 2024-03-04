import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';
import { DEFAULT_AUTHOR } from '../utils/default-values';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllPosts() {
    const posts = await this.prismaService.post.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        author: true,
        content: true,
      },
    });

    return posts;
  }

  async getPostById(postId: string) {
    const post = await this.prismaService.post.findFirst({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException("This post doesn't exist");
    }

    return post;
  }

  async createPost(createPostDto: CreatePostDto) {
    const post = await this.prismaService.post.create({
      data: {
        author: DEFAULT_AUTHOR,
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
      data: { author: DEFAULT_AUTHOR, ...updatePostDto },
    });

    if (!post) {
      throw new NotFoundException("This post doesn't exist");
    }

    return post;
  }

  async deletePost(postId: string) {
    const post = await this.prismaService.post.delete({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException("This post doesn't exist");
    }
  }
}
