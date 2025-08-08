import {  IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AuthUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(25)
    @MinLength(1)
    name: string;

    @IsNotEmpty()
    @MinLength(1)
    password: string;
}