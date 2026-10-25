import { Type } from 'class-transformer';
import {IsNotEmpty, IsNumber, IsString, IsMongoId, Min, IsArray, ValidateNested} from 'class-validator';

export class CreateCartItemDto {
    @IsNotEmpty()
    @IsMongoId()
    product_id: string;

    @IsNotEmpty()
    @IsString()
    product_name: string;

    @IsNotEmpty()
    @IsString()
    product_image: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    product_price: number;  

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    product_quantity: number;
}

export class CreateCartDto {
    @IsMongoId()
    @IsNotEmpty()
    user_id: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    total: number;

    
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateCartItemDto)
    items: CreateCartItemDto[];
}