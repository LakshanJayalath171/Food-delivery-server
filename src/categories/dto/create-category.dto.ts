import { Transform } from "class-transformer";
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

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if(value ==='' || value === undefined || value === null){
            return true
        }
        {if(value === 'true' || value === true){
            return true
        } else {
            return false
        }}
    })
    availability:boolean

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => {
        if(value ==='' || value === undefined || value === null){
            return 0
        }
        return Number(value)
    })
    num_of_products:number
}
