import { Controller, Get, Session } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  signUp(@Session() session: Record<string, any>) {
    console.log(session);
    console.log(session.id);
  }
}
