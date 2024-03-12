import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'crypto';
import { DEFAULT_AUTHOR } from '../utils/default-values';

describe('PostController', () => {
  let postService: PostService;

  const author = DEFAULT_AUTHOR;

  const mockPrismaService = {
    findMany: jest.fn().mockImplementation(() => {
      return [
        {
          id: randomUUID(),
          author: author,
          content: 'This is a post 1',
        },
        {
          id: randomUUID(),
          author: author,
          content: 'This is a post 2',
        },
        {
          id: randomUUID(),
          author: author,
          content: 'This is a post 3',
        },
      ];
    }),

    findFirst: jest.fn().mockImplementation((id: string) => {
      return {
        id: id,
        createdAt: new Date(),
        updatedAt: new Date(),
        content: 'This is a post',
        author: author,
      };
    }),

    create: jest.fn().mockImplementation((data) => {
      return {
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        content: data.content,
      };
    }),

    update: jest.fn().mockImplementation((id, data) => {
      return {
        id: id,
        createdAt: new Date(),
        updatedAt: new Date(),
        content: data.content,
      };
    }),

    delete: jest.fn().mockImplementation((id) => {
      return {
        id: id,
        createdAt: new Date(),
        updatedAt: new Date(),
        content: 'This is a post',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    postService = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(postService).toBeDefined();
  });
});
