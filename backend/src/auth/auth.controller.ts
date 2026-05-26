import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LoginDto, RegisterDto, AuthResponseDto } from './dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any, @Body() loginDto: LoginDto) {
    const userAgent = req.headers['user-agent'];
    return this.authService.login(req.user, userAgent);
  }

  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({ status: 201, type: AuthResponseDto })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @ApiOperation({ summary: 'Get current user profile (using auth token)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req: any) {
    console.log('GET /auth/me accessed by user:', req.user.id);
    return req.user;
  }

  @ApiOperation({ summary: 'Request password reset email' })
  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    await this.authService.forgotPassword(email);
    return { message: 'If the email is registered, a reset link was sent.' };
  }

  @ApiOperation({ summary: 'Reset password with token' })
  @Post('reset-password')
  async resetPassword(@Body() body: any) {
    await this.authService.resetPassword(body.token, body.newPassword);
    return { message: 'Password reset successfully.' };
  }
}
