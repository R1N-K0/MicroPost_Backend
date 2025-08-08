import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(25)
    @MinLength(1)
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 0,
        minNumbers: 0
    })
    password: string;
}