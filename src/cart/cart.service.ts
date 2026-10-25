import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, cartDocument } from './schema/cart.schema.js';
import { CreateCartDto } from './dto/createCart.dto.js';
import { User, userDocument } from '../user/schemas/user.schema.js';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private readonly cartModel: Model<cartDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<userDocument>,
  ) {}

  // create a new cart
  async createCart(createCartDto: CreateCartDto) {
    try {
      const isUser = await this.userModel.findById(createCartDto.user_id);

      if (!isUser) {
        throw new BadRequestException('User not found');
      }

      // Clear the cart when the frontend sends an empty array
      if (createCartDto.items.length === 0) {
        await this.cartModel.findOneAndUpdate(
          { user_id: new Types.ObjectId(createCartDto.user_id) },
          {
            $set: {
              items: [],
              total: 0,
            },
          },
        );

        return {
          success: true,
          message: 'Cart cleared successfully',
        };
      }


      // calculate total price
      const totalPrice = createCartDto.items.reduce(
        (acc, item) => acc + item.product_price * item.product_quantity,
        0,
      );

      

      if (totalPrice !== createCartDto.total) {
        throw new BadRequestException(
          'Total price does not match the sum of item prices',
        );
      }

      

      const cart = await this.cartModel.findOneAndUpdate(
        {
          user_id: new Types.ObjectId(createCartDto.user_id),
        },
        {
          $set: {
            items: createCartDto.items,
            total: createCartDto.total,
          },
          $setOnInsert: {
            user_id: new Types.ObjectId(createCartDto.user_id),
          },
        },
        {
          new: true,
          upsert: true,
          runValidators: true,
          setDefaultsOnInsert: true,
        },
      );

      if (!cart) {
        throw new NotFoundException('Unable to save cart');
      }

      return {
        success: true,
        message: 'Cart saved successfully',
        cart,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new BadRequestException(message);
    }
  }
}
