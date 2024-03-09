import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { DEFAULT_AUTHOR } from '../utils/default-values';
import { randomUUID } from 'crypto';
import { CreatePostDto } from './dto/create-post.dto';

describe('PostController', () => {
  let postController: PostController;
  let postService: PostService;

  const content = 'post created for test';

  const mockPost = {
    id: randomUUID(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
    author: DEFAULT_AUTHOR,
    content: content,
  };

  const mockPostService = {
    createPost: jest.fn().mockResolvedValue(mockPost),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: PostService,
          useValue: mockPostService,
        },
      ],
    }).compile();

    postController = module.get<PostController>(PostController);
    postService = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(postController).toBeDefined();
  });

  describe('Create a post', () => {
    it('should create a post', async () => {
      const result = await postController.createPost({ content });

      expect(result).toEqual(mockPost);
      expect(mockPostService.createPost).toHaveBeenCalled();
    });

    it('should throw an error when creating a post with empty content', async () => {
      const dto: CreatePostDto = {
        content: '',
      };

      const response = await postController.createPost(dto);

      expect(response).toEqual(400);
    });
  });
});
