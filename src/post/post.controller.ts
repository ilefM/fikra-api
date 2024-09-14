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

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    const post = this.postService.createPost(createPostDto);

    return post;
  }

  @Put(':id')
  updatePost(
    @Param('id') postId: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const post = this.postService.updatePost(postId, updatePostDto);

    return post;
  }

  @Delete(':id')
  deletePost(@Param('id') postId: string) {
    this.postService.deletePost(postId);
  }
}
