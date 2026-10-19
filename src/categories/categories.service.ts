import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from '../cloudinary/cloudinary.service.js';
import { categoryDocument, Category } from './schema/category.schema.js';
import { error } from 'console';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<categoryDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(categoryDto: CreateCategoryDto, file: Express.Multer.File) {
    const {
      name,
      description,
      image_url,
      image_id,
      availability = true,
      num_of_products = 0,
    } = categoryDto;

    // Check if a category with the same name already exists (case-insensitive)
    const existingCategory = await this.categoryModel
      .findOne({
        name: {
          $regex: `^${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`,
          $options: 'i',
        },
      })
      .exec();

    if (existingCategory) {
      throw new ConflictException(
        `Category with name "${name}" already exists.`,
      );
    }

    // upload image to cloudinary and get the image_url and image_id

    const uploadImage = await this.cloudinaryService.uploadImage(file);

    try {
      const category = await this.categoryModel.create({
        name,
        description,
        image_url: uploadImage.imageUrl,
        image_id: uploadImage.imageId,
        availability,
        num_of_products,
      });

      return {
        success: true,
        message: 'Category created successfully',
      };
    } catch (error) {
      // clean the cloudinary image if category creation fails
      try {
        await this.cloudinaryService.deleteImage(uploadImage.imageId);
      } catch (cleanError) {
        console.error(
          'Failed to clean up Cloudinary image after category creation failure:',
          cleanError,
        );
      }
    }
    throw error;
  }
}
