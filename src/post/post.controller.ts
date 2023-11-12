import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('/posts')
export class PostController {
  constructor(private readonly postServices: PostService) {}

  @Get()
  getAllPosts() {
    const posts = this.postServices.getAllPosts();
    return posts;
  }

  @Get('/:id')
  getPostById(@Param('id') postId: string) {
    const post = this.postServices.getPostById(postId);

    if (!post) {
      throw new NotFoundException("This post doesn't exist");
    }

    return post;
  }

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postServices.createPost(createPostDto);
  }

  @Put('/:id')
  updatePost(
    @Param('id') postId: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postServices.updatePost(postId, updatePostDto);
  }

  @Delete('/:id')
  deletePost(@Param('id') postId: string) {
    return this.postServices.deletePost(postId);
  }
}
