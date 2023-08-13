import { Controller, Get } from '@nestjs/common';
import { PostService } from './post.service';

@Controller()
export class PostController {
  constructor(private readonly postServices: PostService) {}

  @Get()
  getAllPosts() {
    return this.postServices.getAllPosts();
  }
}
