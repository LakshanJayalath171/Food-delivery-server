import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service.js';
import { RegisterDto } from './dto/user.dto.js';
import { UpdateUserDto } from './dto/updateUser.dto.js';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() registerDto: RegisterDto) {
    return this.userService.signUp(registerDto);
  }

  // get all products for user
  @Get('products')
  async getAllProducts() {
    return this.userService.getAllProducts();
  }

  // get all categories for user
  @Get('categories')
  async getAllCategories() {
    return this.userService.getAllCategories();
  }
  
  // get all own orders for user
  @Get('orders/:id')
  async getOwnOrders(@Param('id') id: string) {
    return this.userService.getOwnOrders(id);
  }

  // get latest 3  orders for user
  @Get('latest-orders/:id')
  async getLatestOrders(@Param('id') id: string) {
    return this.userService.getLatestOrders(id);
  }

  @Put('update-profile/:id')
  async updateUserProfile(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUserProfile(id, updateUserDto);
  }
}
