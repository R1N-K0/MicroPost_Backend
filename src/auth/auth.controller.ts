import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from 'src/Dto/auth-user-dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){
        
    }
    @Post()
    async getAuth(
        @Body() authUserDto:AuthUserDto
    ) {
        return this.authService.getAuth(authUserDto)
    }
}
