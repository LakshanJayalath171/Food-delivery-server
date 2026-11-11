import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersController } from './orders.controller.js';
import { OrdersService } from './orders.service.js';
import { Order, OrderSchema } from './schema/orders.schema.js';
import { OrdersGateway } from './orders.gateway.js';
import { JwtStrategy } from '../auth/jwt.strategy.js';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
	],
	controllers: [OrdersController],
	providers: [OrdersService, OrdersGateway, JwtStrategy],
})
export class OrdersModule {}
