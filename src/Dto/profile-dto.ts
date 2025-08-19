import { MaxLength,  IsString, MinLength, IsNotEmpty, IsOptional } from "class-validator";

export class ProfileDto {
    @IsString()
    @MaxLength(255)
    @MinLength(1)
    @IsNotEmpty()
    name: string

    @IsString()
    @MaxLength(255)
    @IsOptional()
    description?: string

    @IsString()
    @IsOptional()
    img?: string
}