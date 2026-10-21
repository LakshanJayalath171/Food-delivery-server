import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { orderDto } from './dto/orders.dto.js';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    // create a new order
    @Post()
    createOrder(@Body() orderDto: orderDto) {
        return this.ordersService.createOrder(orderDto);
    }
      

}
