import { IsNumber, IsString } from "class-validator";

export class CreateSkil_Categories{

    @IsNumber()
    category_id:number;

    @IsString()
    category_name;

    @IsNumber()
    organization_id:number;
    
}