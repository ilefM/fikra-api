import {
  Body,
  Controller,
  Delete,
  Get,
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
    return this.postServices.getAllPosts();
  }

  @Get('/:id')
  getPostById(@Param('id') postId) {
    return this.postServices.getPostById(postId);
  }

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postServices.createPost(createPostDto);
  }

  @Put('/:id')
  updatePost(@Param('id') postId, @Body() updatePostDto: UpdatePostDto) {
    return this.postServices.updatePost(postId, updatePostDto);
  }

  @Delete('/:id')
  deletePost(@Param('id') postId) {
    return this.postServices.deletePost(postId);
  }
}
