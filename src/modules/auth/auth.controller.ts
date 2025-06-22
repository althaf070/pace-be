import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    const { access_token } = await this.authService.login(req.user);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true, // Use HTTPS in production!
      maxAge: 60 * 60 * 1000, // 1h
    });

    return { message: 'Login successful', user: req.user };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Redirect to Google login
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token } = await this.authService.login(req.user);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      maxAge: 60 * 60 * 1000,
    });

    return { message: 'Google login successful', user: req.user };
  }
}
