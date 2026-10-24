import { Body, Controller, Post } from '@nestjs/common';
import { CartService } from './cart.service.js';
import { CreateCartDto } from './dto/createCart.dto.js';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/add-cart')
  async createCart(@Body() createCartDto: CreateCartDto) {
    return this.cartService.createCart(createCartDto);
  }
  
}
