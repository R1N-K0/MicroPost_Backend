import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/Dto/create-user-dto';

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
}
