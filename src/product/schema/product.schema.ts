import { Prop , Schema , SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type productDocument = HydratedDocument<Product>;

@Schema({timestamps:true})
export class Product{
    @Prop({
        required:true,
        trim:true,
        unique:true
    }) name:string

    @Prop({
        required:true,
        trim:true,
    }) description:string

    @Prop({
        required:true,
        trim:true,
    }) category:string

    @Prop({
        required:true,
        trim:true,
    }) category_id:string

    @Prop({
        required:true,
        trim:true,
        type:Number,
        min:0
    }) price:number

    @Prop({
       default:''
    }) image_url:string

    @Prop({
        default:'',
    }) image_id:string

    @Prop({
        default:true
    }) availability:boolean

    @Prop({
        default:0,
    }) num_of_orders:number

    @Prop({
        default:0,
    }) num_of_reviews:number

    @Prop({
        default:0,
    }) rating:number

    @Prop({
        default:false,
    }) offer:boolean

    @Prop({
        default:0,
    }) offer_price:number
}

export const productSchema = SchemaFactory.createForClass(Product)