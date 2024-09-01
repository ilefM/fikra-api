import { Request } from 'express';

export function extractAccessTokenFromCookie(req: Request): string | null {
  if (req.cookies && 'access_token' in req.cookies) {
    return req.cookies['access_token'];
  }

  return null;
}

export function extractRefreshTokenFromCookie(req: Request): string | null {
  if (req.cookies && 'refresh_token' in req.cookies) {
    return req.cookies['refresh_token'];
  }

  return null;
}
