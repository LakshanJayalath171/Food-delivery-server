import {IsString , IsIn} from "class-validator";

export class UpdateOrderDto{
    @IsString()
    @IsIn(['pending', 'confirmed', 'preparing', 'out-for-delivery', 'completed', 'cancelled'])
    status:string
}