import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './interfaces';
import { GetUserTokens } from './dto/get-tokens.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<GetUserTokens> {
    const passwordHash = await argon.hash(signUpDto.password);

    try {
      const user = await this.prismaService.user.create({
        data: {
          email: signUpDto.email,
          username: signUpDto.username,
          passwordHash,
        },
      });

      const tokens = await this.signToken(user.id, user.username);

      await this.updateToken(user.id, tokens.refreshToken);

      const userTokens: GetUserTokens = {
        userId: user.id,
        username: user.username,
        tokens,
      };

      return userTokens;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new UnauthorizedException('Credentials already taken');
        }
      }
      throw e;
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

    const tokens = await this.signToken(user.id, user.username);

    const userTokens: GetUserTokens = {
      userId: user.id,
      username: user.username,
      tokens,
    };

    return userTokens;
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

  private async signToken(userId: string, email: string): Promise<Tokens> {
    const payload = {
      sub: userId,
      email,
    };

    const atSecret = this.configService.get('JWT_ACCESS_SECRET');
    const at = await this.jwtService.signAsync(payload, {
      expiresIn: '15min',
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
    const hash = await argon.hash(rt);
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshHash: hash,
      },
    });
  }
}
