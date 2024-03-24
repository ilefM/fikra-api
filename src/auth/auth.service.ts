import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { SignInDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async signUp(signUpDto: SignInDto) {
    const passwordHash = await argon.hash(signUpDto.password);

    const user = await this.prismaService.user.create({
      data: {
        username: signUpDto.username,
        passwordHash,
      },
    });

    delete user.passwordHash;

    return user;
  }

  async singnIn(signInDto: SignInDto) {
    const user = await this.prismaService.user.findFirst({
      where: { username: signInDto.username },
    });

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const isValidPassword = await argon.verify(
      user.passwordHash,
      signInDto.password,
    );

    if (!isValidPassword) {
      throw new ForbiddenException('Credentials incorrect');
    }

    delete user.passwordHash;

    return user;
  }
}
