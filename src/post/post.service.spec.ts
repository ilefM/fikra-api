// import { Test, TestingModule } from '@nestjs/testing';
// import { PostService } from './post.service';
// import { PrismaService } from '../prisma/prisma.service';
// import { randomUUID } from 'crypto';
// import { DEFAULT_AUTHOR } from '../utils/default-values';

// describe('PostController', () => {
//   let postService: PostService;
//   let mockPrismaService: PrismaService;

//   const author = DEFAULT_AUTHOR;

//   const s = {
//     findFirst: jest.fn().mockImplementation((id: string) => {
//       return {
//         id: id,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         content: 'This is a post',
//         author: author,
//       };
//     }),

//     create: jest.fn().mockImplementation((data) => {
//       return {
//         id: randomUUID(),
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         content: data.content,
//       };
//     }),

//     update: jest.fn().mockImplementation((id, data) => {
//       return {
//         id: id,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         content: data.content,
//       };
//     }),

//     delete: jest.fn().mockImplementation((id) => {
//       return {
//         id: id,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         content: 'This is a post',
//       };
//     }),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         PostService,
//         {
//           provide: PrismaService,
//           useValue: mockPrismaService,
//         },
//       ],
//     }).compile();

//     postService = module.get<PostService>(PostService);
//     jest.clearAllMocks();
//   });

//   it('should be defined', () => {
//     expect(postService).toBeDefined();
//   });

//   it('should return all posts', async () => {
//     mockPrismaService.post.findMany = jest.fn().mockReturnValue([
//       {
//         id: randomUUID(),
//         author: author,
//         content: 'This is a post 1',
//       },
//       {
//         id: randomUUID(),
//         author: author,
//         content: 'This is a post 2',
//       },
//       {
//         id: randomUUID(),
//         author: author,
//         content: 'This is a post 3',
//       },
//     ]);

//     const posts = await postService.getAllPosts();

//     expect(posts).toHaveLength(3);
//     expect(mockPrismaService.post.findMany).toHaveBeenCalled();
//   });

//   it('should return a post by id', async () => {
//     const id = randomUUID();
//     const post = await postService.getPostById(id);

//     expect(post.id).toBe(id);
//     expect(mockPrismaService.post.findFirst).toHaveBeenCalled();
//   });
// });
