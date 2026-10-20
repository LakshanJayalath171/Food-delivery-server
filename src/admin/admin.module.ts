import { Module } from '@nestjs/common';
import { AdminService } from './admin.service.js';
import { AdminController } from './admin.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from '../orders/schema/orders.schema.js';
import { categorySchema } from '../categories/schema/category.schema.js';
import { productSchema } from '../product/schema/product.schema.js';
import { CloudinaryModule } from '../cloudinary/cloudinary.module.js';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: 'Category', schema: categorySchema }]),
    MongooseModule.forFeature([{ name: 'Product', schema: productSchema }]),
    CloudinaryModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
