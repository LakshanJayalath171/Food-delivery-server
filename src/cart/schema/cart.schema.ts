import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument , Types} from 'mongoose';

export type cartDocument = HydratedDocument<Cart>;

@Schema()
export class CartItem {
    @Prop({
        required: true,
        ref: 'Product'
    })
    product_id: Types.ObjectId;

    @Prop({
        required: true,
    })
    product_name: string;

    @Prop({
        required: true,
    })
    product_image: string;

    @Prop({
        required: true,
    })
    product_price: number;

    @Prop({
        required: true,
    })
    product_quantity: number;
}
@Schema({timestamps: true})
export class Cart {

    @Prop({
        required: true,
        ref: 'User'
    })
    user_id: Types.ObjectId;
    
    @Prop({
        required: true,
        type: [CartItem]
    })
    items: CartItem[];

    @Prop({
        required: true,
        default:0,
    })
    total: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);