import {
    IsArray,
    IsBoolean,
    IsDateString,
    IsEmail,
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
    ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

export class AddressDto {
    @IsString()
    @IsNotEmpty()
    lane: string;

    @IsString()
    @IsNotEmpty()
    street: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    postal_code: string;

    @IsBoolean()
    is_default: boolean;
}

export class FavoriteDishDto {
    @IsMongoId()
    _id: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    first_name?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    last_name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    @Length(8, 20)
    password?: string;

    @IsOptional()
    @IsString()
    phone_number?: string;

    @IsOptional()
    @IsDateString()
    date_of_birth?: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AddressDto)
    addresses?: AddressDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => FavoriteDishDto)
    favorite_dishes?: FavoriteDishDto[];
}