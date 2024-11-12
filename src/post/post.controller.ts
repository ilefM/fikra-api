import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AtGuard } from '../guards';
import { GetCurrentUserId } from '../decorators';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAllPosts() {
    const posts = this.postService.getAllPosts();

    return posts;
  }

  @Get(':id')
  getPostById(@Param('id') postId: string) {
    const post = this.postService.getPostById(postId);

    return post;
  }

  @UseGuards(AtGuard)
  @Post()
  createPost(
    @GetCurrentUserId() userId: string,
    @Body() createPostDto: CreatePostDto,
  ) {
    const post = this.postService.createPost(createPostDto, userId);

    return post;
  }

  @UseGuards(AtGuard)
  @Put(':id')
  updatePost(
    @GetCurrentUserId() userId: string,
    @Param('id') postId: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const post = this.postService.updatePost(userId, postId, updatePostDto);

    return post;
  }

  @UseGuards(AtGuard)
  @Delete(':id')
  deletePost(@GetCurrentUserId() userId: string, @Param('id') postId: string) {
    this.postService.deletePost(userId, postId);
  }
}
