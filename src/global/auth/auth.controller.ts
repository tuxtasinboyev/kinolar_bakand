import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/register-auth.dto';
import { VerifyDto } from './dto/verify-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @ApiOperation({ summary: 'this route sends to email your' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiBody({ type: CreateAuthDto })
  async register(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.register(createAuthDto);
  }

  @Post('verification')
  @ApiOperation({ summary: 'Verify email with code' })
  @ApiResponse({ status: 200, description: 'Verification successful' })
  @ApiBody({ type: VerifyDto })
  async verification(@Body() codeVerification: VerifyDto) {
    return this.authService.Verification(codeVerification);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Login successful, returns access token' })
  @ApiBody({ type: LoginDto })
  async login(@Body() payload: LoginDto) {
    return await this.authService.login(payload);
  }
}
