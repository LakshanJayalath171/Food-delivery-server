import { Controller , Get } from '@nestjs/common';
import { AdminService } from './admin.service.js';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // get all orders
  @Get('all-orders')
  async getAllOrders() {
    return this.adminService.getAllOrders();
  }
  
  // get all categories
  @Get('all-categories')
  async getAllCategories() {
    return this.adminService.getAllCategories();
  }

  // get all products
  @Get('all-products')
  async getAllProducts() {
    return this.adminService.getAllProducts();
  }

  // get top rated dishes
  @Get('top-rated-dishes')
  async getTopRatedDishes() {
    return this.adminService.getTopRatedDishes();
  }
}
