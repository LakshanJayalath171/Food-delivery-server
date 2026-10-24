import { Module } from '@nestjs/common';
import { CartService } from './cart.service.js';
import { CartController } from './cart.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, cartDocument, CartSchema } from './schema/cart.schema.js';
import { User, UserSchema } from '../user/schemas/user.schema.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }, { name: User.name, schema: UserSchema }])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
