// import { Test, TestingModule } from '@nestjs/testing';
// import { randomUUID } from 'crypto';
// import { CreatePostDto } from './dto/create-post.dto';
// import { DEFAULT_AUTHOR } from '../utils/default-values';
// import { PostService } from './post.service';
// import { PostController } from 'src/post/post.controller';

// describe('PostController', () => {
//   let postController: PostController;

//   const dto: CreatePostDto = {
//     content: 'post created for test',
//   };

//   const mockPost = {
//     id: randomUUID(),
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//     author: DEFAULT_AUTHOR,
//     content: dto.content,
//   };

//   const mockPosts = [
//     {
//       id: randomUUID(),
//       createdAt: Date.now(),
//       updatedAt: Date.now(),
//       author: DEFAULT_AUTHOR,
//       content: dto.content,
//     },
//     {
//       id: randomUUID(),
//       createdAt: Date.now(),
//       updatedAt: Date.now(),
//       author: DEFAULT_AUTHOR,
//       content: dto.content,
//     },
//     {
//       id: randomUUID(),
//       createdAt: Date.now(),
//       updatedAt: Date.now(),
//       author: DEFAULT_AUTHOR,
//       content: dto.content,
//     },
//   ];

//   const mockPostService = {
//     createPost: jest.fn().mockResolvedValue(mockPost),
//     getPostById: jest.fn().mockResolvedValue(mockPost),
//     getAllPosts: jest.fn().mockResolvedValue(mockPosts),
//     updatePost: jest.fn().mockRejectedValue(mockPost),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [PostController],
//       providers: [
//         {
//           provide: PostService,
//           useValue: mockPostService,
//         },
//       ],
//     }).compile();

//     postController = module.get<PostController>(PostController);
//     jest.clearAllMocks();
//   });
//   it('should be defined', () => {
//     expect(postController).toBeDefined();
//   });

//   it('should create a post', async () => {
//     const result = await postController.createPost(dto);

//     expect(result).toEqual(mockPost);
//     expect(mockPostService.createPost).toHaveBeenCalled();
//   });

//   it('should get a post', async () => {
//     const result = await postController.getPostById(mockPost.id);

//     expect(result).toEqual(mockPost);
//     expect(mockPostService.getPostById).toHaveBeenCalledWith(mockPost.id);
//   });

//   it('should get a post', async () => {
//     const result = await postController.getAllPosts();

//     expect(result).toEqual(mockPosts);
//     expect(mockPostService.getAllPosts).toHaveBeenCalled();
//   });
// });
