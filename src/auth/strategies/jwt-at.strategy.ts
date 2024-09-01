import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { extractAccessTokenFromCookie } from './extractors';
import { JwtPayload } from '../interfaces';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtATStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authService: AuthService, configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([extractAccessTokenFromCookie]),
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const isUserLogout: boolean = await this.authService.isTokenValid(payload);

    if (!isUserLogout) throw new UnauthorizedException();

    return payload;
  }
}
