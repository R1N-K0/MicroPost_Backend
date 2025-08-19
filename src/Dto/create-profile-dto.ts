import { IsNumber, IsNotEmpty, IsString } from "class-validator";
import { ProfileDto } from "./profile-dto";

export class CreateProfileDto {
    data: ProfileDto
}