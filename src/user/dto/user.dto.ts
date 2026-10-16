import { IsEmail , IsNotEmpty , IsString , MaxLength , MinLength } from "class-validator";

export class RegisterDto{
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    first_name:string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    last_name:string;

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(256)
    email:string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(72)
    password:string;
}