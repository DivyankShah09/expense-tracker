import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { ApiResponse } from '../common/utils/api-response.util';
import { LoginCredentialsDto } from './dto/login-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupCredentialsDto: SignupCredentialsDto) {
    const existingUser = await this.userService.findByEmail(
      signupCredentialsDto.email,
    );
    if (existingUser) {
      return ApiResponse({
        statusCode: 409,
        statusMessage: 'User already exists with the provided email.',
        data: null,
      });
    }

    const hashedPassword = await bcrypt.hash(signupCredentialsDto.password, 10);
    const user = new User({
      ...signupCredentialsDto,
      password: hashedPassword,
    });

    await this.userService.create(user); // Use UserService to create user

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    // Return custom response for successful signup
    return ApiResponse({
      statusCode: 201,
      statusMessage: 'User successfully created.',
      data: { name: user.name, email: user.email, access_token: token },
    });
  }

  async login(loginCredentialsDto: LoginCredentialsDto) {
    const user = await this.userService.findByEmail(loginCredentialsDto.email);

    if (!user) {
      return ApiResponse({
        statusCode: 401,
        statusMessage: 'Invalid login credentials.',
        data: null,
      });
    }

    const isPasswordValid = await bcrypt.compare(
      loginCredentialsDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      return ApiResponse({
        statusCode: 401,
        statusMessage: 'Invalid login credentials.',
        data: null,
      });
    }
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    // Return custom response for successful signup
    return ApiResponse({
      statusCode: 201,
      statusMessage: 'Login Successful',
      data: { access_token: token },
    });
  }
}
