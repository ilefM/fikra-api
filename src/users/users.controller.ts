import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    const users = this.usersService.getAllUsers();

    return users;
  }

  @Get(':id')
  getUserById(@Param('id') userId: string) {
    const user = this.usersService.getUserById(userId);

    return user;
  }

  @Put(':id')
  updateUser(
    @Param('id') postId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const post = this.usersService.updateUser(postId, updateUserDto);

    return post;
  }

  @Delete(':id')
  deleteUser(@Param('id') userId: string) {
    this.usersService.deleteUser(userId);
  }

  @Get(':id/posts')
  getUserPosts(@Param('id') userId: string) {
    const posts = this.usersService.getUserPosts(userId);

    return posts;
  }
}
