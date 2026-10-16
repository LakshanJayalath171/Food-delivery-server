import { Prop , Schema , SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type userDocument = HydratedDocument<User>

// favorite dish schema
@Schema({_id:false})
export class FavoriteDish{
    @Prop({
        type:Types.ObjectId,
        required:true,
        ref:"Product"
    }) _id :Types.ObjectId;

    @Prop({
        required:true,
        trim:true
    }) name:string;

}

export const FavoriteDishSchema = SchemaFactory.createForClass(FavoriteDish);

// user address schema

@Schema({_id:false})
export class Address{
    @Prop({
        required:true,
        trim:true
    }) label:string;

    @Prop({
        required:true,
        trim:true
    }) street:string;

    @Prop({
        required:true,
        trim:true
    }) city:string;

    @Prop({
        required:true,
        trim:true
    }) postal_code:string;

    @Prop({
        required:true,
    }) is_default:boolean;

}

export const AddressSchema = SchemaFactory.createForClass(Address);


// user schema
@Schema({timestamps:true})
export class User{
    @Prop({
        required:true,
        trim:true,
    }) first_name:string;

    @Prop({
        required:true,
        trim:true,
    }) last_name:string;

    @Prop({
        required:true,
        unique:true,
        trim:true,
    }) email:string;

    @Prop({
        required:true
    }) password:string;

    @Prop({
        default:''
    }) phone_number:string;

    @Prop({
        default:''
    }) date_of_birth:Date;

    @Prop({
        default:''
    }) profile_image:string

    @Prop({
        type:[FavoriteDishSchema],
        default:[]
    }) favorite_dishes:FavoriteDish[];

    @Prop({
        type:[AddressSchema],
        default:[]
    }) addresses:Address[];
}

export const UserSchema = SchemaFactory.createForClass(User);