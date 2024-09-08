import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { GetCurrentUser, GetCurrentUserId } from '../decorators';
import { Tokens } from './interfaces';
import { AtGuard, RtGuard } from '../guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    const userTokens = await this.authService.signUp(signUpDto);

    this.setCookies(res, userTokens.tokens);

    res.send({
      userId: userTokens.userId,
      username: userTokens.username,
    });
  }

  @Post('signin')
  async SignIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    const userTokens = await this.authService.singnIn(signInDto);

    this.setCookies(res, userTokens.tokens);

    res.send({
      userId: userTokens.userId,
      username: userTokens.username,
    });
  }

  @UseGuards(RtGuard)
  @Post('refresh')
  async refresh(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
    @Res() res: Response,
  ) {
    const tokens = await this.authService.refreshToken(userId, refreshToken);

    this.setCookies(res, tokens);

    res.sendStatus(200);
  }

  @UseGuards(AtGuard)
  @Post('signout')
  async signOut(@GetCurrentUserId() userId: string, @Res() res: Response) {
    await this.authService.signOut(userId);
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.sendStatus(200);
  }

  private setCookies(res: Response, tokens: Tokens) {
    res.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return res;
  }
}
