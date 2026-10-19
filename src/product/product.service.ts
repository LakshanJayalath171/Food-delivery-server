import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { Product, productDocument } from './schema/product.schema.js';
import { Model } from 'mongoose';
import { CloudinaryService } from '../cloudinary/cloudinary.service.js';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<productDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createProductDto: CreateProductDto, file: Express.Multer.File) {
    const {
      name,
      description,
      category,
      category_id,
      price,
      availability = true,
      num_of_orders = 0,
      num_of_reviews = 0,
      rating = 0,
      offer = false,
      offer_price,
    } = createProductDto;

    // check if product with same name already exists
    const existingProduct = await this.productModel
      .findOne({
        name: {
          $regex: `^${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`,
          $options: 'i',
        },
      })
      .exec();

    if (existingProduct) {
      throw new ConflictException(
        `Product with name "${name}" already exists.`,
      );
    }

    // upload image to cloudinary and get the image_url and image_id
    const uploadImage = await this.cloudinaryService.uploadImage(file);

    try {
      const product = await this.productModel.create({
        name,
        description,
        category,
        category_id,
        price,
        image_url: uploadImage.imageUrl,
        image_id: uploadImage.imageId,
        availability,
        num_of_orders,
        num_of_reviews,
        rating,
        offer_price,
      });

      return {
        success: true,
        message: 'Product created successfully',
        name: product.name,
      };
    } catch (error) {
      // clean the uploaded image from cloudinary if product creation fails
      try {
        await this.cloudinaryService.deleteImage(uploadImage.imageId);
      } catch (CleanError) {
        console.error(
          'Failed to clean up image from Cloudinary after product creation failure:',
          CleanError,
        );
      }
    }
  }
}
