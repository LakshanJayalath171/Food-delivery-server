import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { categoryDocument ,Category } from './schema/category.schema.js';


@Injectable()
export class CategoriesService {
    constructor(@InjectModel(Category.name) private readonly categoryModel: Model<categoryDocument>) {}
    
  async create(categoryDto: CreateCategoryDto){
        const { name, description, image_url, image_id, availability, num_of_products } = categoryDto;

        const existingCategory = await this.categoryModel
      .findOne({
        name: { $regex: `^${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' },
      })
      .exec();

      if(existingCategory){
        throw new ConflictException(`Category with name "${name}" already exists.`);
      }

      const category = await this.categoryModel.create({
        name,
        description,
        image_url,
        image_id,
        availability,
        num_of_products
      })
      
      return{
        message:'Category created successfully',
        categoryName:category.name
      }
    }

      findAll() {
        return this.categoryModel.find().exec();
      }

      findOne(id: number) {
        return this.categoryModel.findById(String(id)).exec();
      }

      update(id: number, updateCategoryDto: UpdateCategoryDto) {
        return this.categoryModel
          .findByIdAndUpdate(String(id), updateCategoryDto, { new: true, runValidators: true })
          .exec();
      }

      remove(id: number) {
        return this.categoryModel.findByIdAndDelete(String(id)).exec();
      }
}
