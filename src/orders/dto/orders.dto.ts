import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsMongoId, IsNotEmpty, IsNumber, IsString, ValidateNested} from 'class-validator';

export class orderItem{
    @IsMongoId()
    @IsNotEmpty()
    product_id: string;

    @IsString()
    @IsNotEmpty()
    product_name: string;

    @IsNumber()
    @IsNotEmpty()
    product_price: number;

    @IsNotEmpty()
    @IsString()
    image_url: string;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}

export class address{
    @IsString()
    @IsNotEmpty()
    lane: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    state: string;

    @IsNotEmpty()
    @IsNumber()
    postal_code: number;
}


export class orderDto{
    @IsMongoId()
    @IsNotEmpty()
    user_id: string;

    @IsNotEmpty()
    @IsString()
    user_name: string;

    @IsNotEmpty()
    @IsString()
    phone_number: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(()=> orderItem)
    items: orderItem[];
    

    @IsArray()
    @IsNotEmpty()
    @ArrayMaxSize(1)
    @ValidateNested({ each: true })
    @Type(()=> address)
    address: address[];

    @IsNumber()
    @IsNotEmpty()
    totalPrice: number;
}