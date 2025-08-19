import { Controller, Param, Put, Query, Body, Get } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from 'src/Dto/create-profile-dto';
import { ProfileDto } from 'src/Dto/profile-dto';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService){}

    @Get(":id")
    async getProfile(
        @Param("id") id: number,
        @Query("token") token: string
    ){
        return await this.profileService.getProfile(token, id)
    }

    @Put(":id")
    async updateOrCreateProfile(
        @Param("id") id: number,
        @Query("token") token: string,
        @Body() profileDto: ProfileDto,
    ){
        return await this.profileService.updateOrCreateProfile(token,id, profileDto)
    }

}
