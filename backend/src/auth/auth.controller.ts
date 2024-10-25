import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() signupCredentialsDto: SignupCredentialsDto) {
    return this.authService.signup(signupCredentialsDto);
  }

  @Post('/login')
  async login(@Body() loginCredentialsDto: LoginCredentialsDto) {
    return this.authService.login(loginCredentialsDto);
  }
}
