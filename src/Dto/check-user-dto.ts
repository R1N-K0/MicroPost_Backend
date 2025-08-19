import {IsNumber,  IsNotEmpty,  IsString } from "class-validator";

export class CheckUserDto {
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @IsNotEmpty()
    @IsString()
    token: string;
}