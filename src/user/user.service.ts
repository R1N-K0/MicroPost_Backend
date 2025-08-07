import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Equal, MoreThan, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Auth } from 'src/entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from "crypto"

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
            }
        })

        if(!user) throw new NotFoundException()

        return user
    }

    async createUser(name: string, email: string, password: string) {
        const hash = crypto.createHash("md5").update(password).digest("hex")

        const record = {
            name: name,
            email: email,
            hash: hash
        }

        await this.userRepository.save(record)
        return "成功しました";
    }
}
