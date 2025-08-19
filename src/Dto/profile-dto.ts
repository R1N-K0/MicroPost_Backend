import { MaxLength,  IsString, MinLength, IsNotEmpty } from "class-validator";

export class ProfileDto {
    @IsString()
    @MaxLength(255)
    @MinLength(1)
    @IsNotEmpty()
    name: string

    @IsString()
    @MaxLength(255)
    description?: string

    @IsString()
    img?: string
}