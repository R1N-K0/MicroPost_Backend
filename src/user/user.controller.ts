import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/Dto/create-user-dto';
import type { UpdateUserData } from 'src/types';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get(":id")
    async getUser(
        @Param("id") id: number,
        @Query("token") token: string
    ){
        return await this.userService.getUser(token, id);
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto){
        return await this.userService.createUser(createUserDto)
    }

    @Put(":id")
    async updateUser(
        @Param("id") id: number,
        @Query("token") token: string,
        @Body() data: UpdateUserData
    ){
        return await this.userService.updateUser(token, id, data)
    }
}
