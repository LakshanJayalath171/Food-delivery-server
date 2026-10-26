import { Schema , SchemaFactory ,Prop } from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

export type OrderDocument = HydratedDocument<Order>;
// items schema
@Schema({_id:false})
export class OrderItem {
    @Prop({
        required:true
    })
    product_id:string

    @Prop({
        required:true
    })
    product_name:string

    @Prop({
        required:true
    })
    product_price:number

    @Prop({
        required:true
    })
    quantity:number

    @Prop({
        required:true
    })
    image_url:string

}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

// order schema
@Schema({_id:true})
export class address{
    @Prop({
        required:true
    }) lane:string

    @Prop({
        required:true
    }) street:string

    @Prop({
        required:true
    }) city:string

    @Prop({
        required:true
    }) postal_code:number

    @Prop({
        required:true
    }) is_default:boolean
}

export const addressSchema = SchemaFactory.createForClass(address);

// order schema

@Schema({timestamps:true})
export class Order {
    @Prop({
        required:true
    })
    user_id:string

    @Prop({
        required:true
    })
    user_name:string

    @Prop({
        required:true
    })
    phone_number:string

    @Prop({
        required:true,
        type:[addressSchema]
    })
    address:address[]

    @Prop({
        required:true,
        type:[OrderItemSchema]
    })
    items:OrderItem[]

    @Prop({
        required:true
    })
    total_price:string

    @Prop({
        enum:['pending','confirmed' , 'preparing' , 'out-for-delivery','completed','cancelled'],
        default:'pending',
    })status:string
}

export const OrderSchema = SchemaFactory.createForClass(Order);