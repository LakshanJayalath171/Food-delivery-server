import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service.js';
import { CategoriesController } from './categories.controller.js';
import { Category } from './entities/category.entity.js';
import { MongooseModule } from '@nestjs/mongoose';
import { categorySchema } from './schema/category.schema.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: categorySchema }])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
