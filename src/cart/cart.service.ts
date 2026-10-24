import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
    async createCart(createCartDto: CreateCartDto){
        try{
            const isUser = await this.userModel.findById(createCartDto.user_id);
            
            if(!isUser){
                throw new BadRequestException('User not found');
            }
            if(!createCartDto.items || createCartDto.items.length === 0){
                throw new BadRequestException('Items array cannot be empty');
            }

            // calculate total price
            const totalPrice = createCartDto.items.reduce((acc, item) => acc + (item.product_price * item.product_quantity), 0);

            const cart = await this.cartModel.create({
                ...createCartDto,
                user_id: createCartDto.user_id,
                total: totalPrice
            });
            return {
                success: true,
                message: 'Cart created successfully',
                cart:cart
            };
        }
        catch(error){
            const message = error instanceof Error ? error.message : String(error);
            throw new BadRequestException(message);
        }
    }
}
