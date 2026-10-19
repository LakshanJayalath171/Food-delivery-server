import { Prop , Schema ,SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type categoryDocument = HydratedDocument<Category>;

@Schema({timestamps:true})
export class Category{
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
        default:''
    }) image_url:string

    @Prop({
        default:'',
        required:true
    }) image_id:string

    @Prop({
        required:true,
        default:true
    }) availability:boolean

    @Prop({
        default:0,
        required:true,
    }) num_of_products:number


}

export const categorySchema = SchemaFactory.createForClass(Category)