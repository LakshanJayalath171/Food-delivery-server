import { IsBoolean , IsString , IsNotEmpty , MaxLength, IsNumber } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(70)
    name:string

    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    description:string

    @IsString()
    image:string

    @IsBoolean()
    availability:boolean

    @IsNumber()
    num_of_products:number
}
