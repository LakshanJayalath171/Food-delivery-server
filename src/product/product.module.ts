import { Module } from '@nestjs/common';
import { ProductService } from './product.service.js';
import { ProductController } from './product.controller.js';
import { productSchema } from './schema/product.schema.js';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from '../cloudinary/cloudinary.module.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: productSchema }]),
    CloudinaryModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
