import { Controller, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('/posts')
export class PostController {
  constructor(private readonly postServices: PostService) {}

  @Get()
  getAllPosts() {
    return this.postServices.getAllPosts();
  }

  @Get('/:id')
  getPostById() {
    return 'This will return one post';
  }

  @Post()
  createPost() {
    return 'post created';
  }
}
