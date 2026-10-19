import { IsBoolean , IsString , IsNotEmpty , MaxLength, IsNumber, IsOptional } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(70)
    name:string

    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    description:string

    @IsOptional()
    @IsString()
    image_url?:string

    @IsOptional()
    @IsString()
    image_id?:string

    @IsBoolean()
    availability:boolean

    @IsNumber()
    num_of_products:number
}
