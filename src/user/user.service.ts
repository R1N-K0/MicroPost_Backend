import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Equal, MoreThan, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Auth } from 'src/entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from "crypto"
import { CreateUserDto } from 'src/Dto/create-user-dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>,
    ){}

    async getUser(token: string, id: number){
        const now = new Date()
        const auth = await this.authRepository.findOne({
            where: {
                token: Equal(token),
                expire_at: MoreThan(now)
            }
        })

        if(!auth) throw new ForbiddenException()

        const user = await this.userRepository.findOne({
            where: {
                id: Equal(id)
            },
            select: {
                id: true,
                name: true,
                created_at: true
            }
        })

        if(!user) throw new NotFoundException()

        return user
    }

    async createUser(createUserDto: CreateUserDto) {
        const {name, email, password} = createUserDto
        const user = await this.userRepository.findOne({
            where: {
                email: Equal(email)
            }
        })

        if(user) throw new BadRequestException("ユーザーはすでに登録されています");
        
        const hash = crypto.createHash("md5").update(password).digest("hex")

        const record = {
            name: name,
            email: email,
            hash: hash
        }

        return await this.userRepository.save(record)
    }
}
