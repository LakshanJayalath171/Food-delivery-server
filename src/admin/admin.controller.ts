import { Body, Controller , Delete, Get, Param, Put } from '@nestjs/common';
import { AdminService } from './admin.service.js';
import { UpdateCategoryDto } from '../categories/dto/update-category.dto.js';

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

  // get a category by id
  @Get('category/:id')
  async getCategoryById(@Param('id') id: string) {
    return this.adminService.getCategoryById(id);
  }

  // get a product by id
  @Get('product/:id')
  async getProductById(@Param('id') id: string) {
    return this.adminService.getProductById(id);
  }

  // get an order by id
  @Get('order/:id')
  async getOrderById(@Param('id') id: string) {
    return this.adminService.getOrderById(id);
  }

  // delete a product by id
  @Delete('delete-product/:id')
  async deleteProductById(@Param('id') id: string) {
    return this.adminService.deleteProductById(id);
  }

  // delete a category by id
  @Delete('delete-category/:id')
  async deleteCategoryById(@Param('id') id: string) {
    return this.adminService.deleteCategoryById(id);
  }
  
  // update a category by id
  @Put('update-category/:id')
  async updateCategoryById(@Param('id') id: string, @Body() updateData: UpdateCategoryDto) {
    return this.adminService.updateCategoryById(id, updateData);
  }

  // update a product by id
  @Put('update-product/:id')
  async updateProductById(@Param('id') id: string, @Body() updateData: any) {
    return this.adminService.updateProductById(id, updateData);
  }

  // change order status by id
  @Put('change-order-status/:id')
  async changeOrderStatusById(@Param('id') id: string, @Body() updateData: any) {
    return this.adminService.changeOrderStatusById(id, updateData.status);
  }
  
}
