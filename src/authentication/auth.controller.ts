import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAdminDto } from '../users/user.dtos';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginAdminDto) {
    return await this.authService.login(data);
  }

  @Post('protected-route')
  @UseGuards(AuthGuard(), JwtAuthGuard)
  protectedRoute() {
    return 'This route is protected';
  }
}
