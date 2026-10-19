import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schema/orders.schema.js';
import { Model } from 'mongoose';
import { orderDto } from './dto/orders.dto.js';

@Injectable()
export class OrdersService {

    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>
    ) {}
    
    async createOrder(orderDto: orderDto){

        // validate items array
        try{
            if(!orderDto.items || orderDto.items.length === 0){
            throw new BadRequestException('Items array cannot be empty');
        }

        // validate address array
        if(!orderDto.address || orderDto.address.length === 0){
            throw new BadRequestException('Address array cannot be empty');
        }
        
        // calculate total price
        const totalPrice = orderDto.items.reduce((acc, item) => acc + (item.product_price * item.quantity), 0);

        // validate total price
        if(totalPrice !== orderDto.totalPrice){
            throw new BadRequestException('Total price does not match the sum of item prices');
        }

        const order = await this.orderModel.create({
            ...orderDto,
            total: totalPrice.toString()
        })
        return {
            success:true,
            message:'Order created successfully',
            order_id:order._id
        };
        }
        catch(error){
            const message = error instanceof Error ? error.message : String(error);
            throw new BadRequestException(message);
        }
    }
}
