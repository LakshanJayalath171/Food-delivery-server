import { Transform } from "class-transformer";
import { IsBoolean , IsOptional, IsString, MaxLength  } from "class-validator";

export class UpdateCategoryDto {
    @IsOptional()
    @IsString()
    @MaxLength(70)
    name?:string

    @IsOptional()
    @IsString()
    @MaxLength(200)
    description?:string

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if(value ==='' || value === undefined || value === null){
            return true
        }
        if(value === 'true' || value === true){
            return true
        }
        if(value === 'false' || value === false){
            return false
        }
        return value;
    })
    isActive?:boolean
}