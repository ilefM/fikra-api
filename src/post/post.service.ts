import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllPosts() {
    const posts = await this.prismaService.post.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        content: true,
        authorUsername: true,
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

  async createPost(createPostDto: CreatePostDto, userId: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        username: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('No authorized to create a post');
    }

    const post = await this.prismaService.post.create({
      data: {
        content: createPostDto.content,
        author: {
          connect: { username: user.username },
        },
      },
    });

    return post;
  }

  async updatePost(
    userId: string,
    postId: string,
    updatePostDto: UpdatePostDto,
  ) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        'You are not allowed to update this post',
      );
    }

    let postUpdated: Post;

    try {
      postUpdated = await this.prismaService.post.update({
        where: {
          id: postId,
          authorUsername: user.username,
        },
        data: {
          ...updatePostDto,
        },
      });
    } catch (_) {
      throw new UnauthorizedException(
        'You are not allowed to update this post',
      );
    }

    return postUpdated;
  }

  async deletePost(userId: string, postId: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        'You are not allowed to update this post',
      );
    }

    try {
      await this.prismaService.post.delete({
        where: {
          id: postId,
          authorUsername: user.username,
        },
      });
    } catch (_) {
      throw new UnauthorizedException(
        'You are not allowed to update this post',
      );
    }
  }
}
