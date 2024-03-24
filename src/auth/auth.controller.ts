import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto: SignInDto) {
    const user = this.authService.signUp(signUpDto);

    return user;
  }

  @Post('signin')
  SignInDto(@Body() signInDto: SignInDto) {
    const user = this.authService.singnIn(signInDto);

    return user;
  }
}
