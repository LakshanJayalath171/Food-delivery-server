import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersController } from './orders.controller.js';
import { OrdersService } from './orders.service.js';
import { Order, OrderSchema } from './schema/orders.schema.js';
import { OrdersGateway } from './orders.gateway.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
		AuthModule,
	],
	controllers: [OrdersController],
	providers: [OrdersService, OrdersGateway],
	exports: [OrdersGateway],
})
export class OrdersModule {}
