import { Transform, Type } from 'class-transformer';
import { IsString, IsNumber, IsBoolean, IsOptional, MaxLength, IsNotEmpty, Min } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    name: string;

    @IsString()
    @MaxLength(200)
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsString()
    @IsNotEmpty()
    category_id: string;

    @Type(() => Number)
    @Transform(({ value }) => {
        if (value === undefined || value === null || value === '') {
            return undefined;
        }
        return Number(value);
    })
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    price: number;

    @IsOptional()
    availability: boolean;

    @IsOptional()
    num_of_orders: number;

    @IsOptional()
    @Transform(({value})=>{
        if(value === undefined || value === null || value === ''){
            return undefined;
        }
        if(value ==='true'){
            return true;
        }
        if(value ==='false'){
            return false;
        }
        return value;
    })
    num_of_reviews: number;

    @IsOptional()
    rating: number;

    @IsOptional()
    @Transform(({value})=>{
        if(value === undefined || value === null || value === ''){
            return undefined;
        }
        if(value ==='true'){
            return true;
        }
        if(value ==='false'){
            return false;
        }
        return value;
    })
    offer: boolean;

    @IsOptional()
    offer_price: number;
}
