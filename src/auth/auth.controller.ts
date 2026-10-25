import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AdminLoginDto } from './dto/admin-login.dto.js';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('admin/login')
  @HttpCode(200)
  async adminLogin(@Body() loginDto: AdminLoginDto) {
    return this.authService.adminLogin(loginDto);
  }

  @Post('user/login')
  @HttpCode(200)
  async userLogin(@Body() loginDto: AdminLoginDto) {
    return this.authService.userLogin(loginDto);
  }

  @Get('user/profile')
  @UseGuards(AuthGuard('jwt'))
  async getUserProfile(@Req() request: any) {
    return this.authService.getUserProfile(request.user);
  }
}
