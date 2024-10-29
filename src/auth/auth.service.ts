import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, Tokens } from './interfaces';
import { GetUserTokens } from './dto/get-tokens.dto';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<GetUserTokens> {
    const passwordHash = await argon.hash(signUpDto.password);
    let user: User;

    try {
      user = await this.prismaService.user.create({
        data: {
          email: signUpDto.email,
          username: signUpDto.username,
          passwordHash,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new UnauthorizedException('Credentials already taken');
        }
      }
      throw e;
    }

    try {
      const tokens = await this.signToken(user.id, user.email);

      // create a refresh token in the database
      await this.updateToken(user.id, tokens.refreshToken);

      const userTokens: GetUserTokens = {
        userId: user.id,
        username: user.username,
        tokens,
      };

      return userTokens;
    } catch (e) {
      await this.prismaService.user.delete({
        where: {
          email: signUpDto.email,
        },
      });

      throw new InternalServerErrorException('The server encountered an error');
    }
  }

  async singnIn(signInDto: SignInDto): Promise<GetUserTokens> {
    const userByUsername = await this.prismaService.user.findFirst({
      where: { username: signInDto.login },
    });

    const userByEmail = await this.prismaService.user.findFirst({
      where: { email: signInDto.login },
    });

    const user = userByUsername ?? userByEmail ?? null;

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword = await argon.verify(
      user.passwordHash,
      signInDto.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    try {
      const tokens = await this.signToken(user.id, user.email);

      await this.updateToken(user.id, tokens.refreshToken);

      const userTokens: GetUserTokens = {
        userId: user.id,
        username: user.username,
        tokens,
      };

      return userTokens;
    } catch (e) {
      throw new InternalServerErrorException('The server encountered an error');
    }
  }

  async refreshToken(userId: string, rt: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.refreshHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidToken = await argon.verify(user.refreshHash, rt);

    if (!isValidToken) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.signToken(user.id, user.email);

    await this.updateToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async signOut(userId: string) {
    await this.prismaService.user.update({
      where: {
        id: userId,
        refreshHash: {
          not: null,
        },
      },
      data: {
        refreshHash: null,
      },
    });
  }

  async isTokenValid(payload: JwtPayload): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    return user.refreshHash !== null;
  }

  private async signToken(userId: string, email: string): Promise<Tokens> {
    const payload = {
      sub: userId,
      email,
    };

    const atSecret = this.configService.get('JWT_ACCESS_SECRET');
    const at = await this.jwtService.signAsync(payload, {
      expiresIn: '1min',
      secret: atSecret,
    });

    const rtSecret = this.configService.get('JWT_REFRESH_SECRET');
    const rt = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: rtSecret,
    });

    return { accessToken: at, refreshToken: rt };
  }

  private async updateToken(userId: string, rt: string) {
    const rtHash = await argon.hash(rt);
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshHash: rtHash,
      },
    });
  }
}
