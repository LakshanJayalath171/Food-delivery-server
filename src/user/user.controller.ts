import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service.js';
import { RegisterDto } from './dto/user.dto.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() registerDto: RegisterDto) {
    return this.userService.signUp(registerDto);
  }
  
}
