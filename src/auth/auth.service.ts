import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, MoreThan, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Auth } from 'src/entities/auth.entity';
import * as crypto from "crypto"
import { AuthUserDto } from 'src/Dto/auth-user-dto';
import { CheckUserDto } from 'src/Dto/check-user-dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>
    ){
    }

    async getAuth(authUserDto: AuthUserDto) {
        const {name, password} = authUserDto
        if(!password) throw new UnauthorizedException();

        const hash = crypto.createHash("md5").update(password).digest("hex")

        const user = await this.userRepository.findOne({
            where: {
                name: Equal(name),
                hash: Equal(hash)
            }
        })
        if(!user) throw new UnauthorizedException();

        const ret = {
            token: "",
            user_id: user.id
        }

        var expire = new Date();
        expire.setDate(expire.getDate() + 1)

        const auth = await this.authRepository.findOne({
            where: {
                user_id: Equal(user.id)
            }
        })

        if(auth) {
            ret.token = auth.token
            auth.expire_at = expire
            await this.authRepository.save(auth)

        } else {
            const token = crypto.randomUUID()
            await this.authRepository.save({
                user_id: ret.user_id,
                token: token,
                expire_at: expire.toISOString()
            })
            ret.token = token
        }

        return ret
    }

    async checkUser(checkUserDto: CheckUserDto) {
        const {user_id, token} = checkUserDto
        const now = new Date();

        const auth = await this.authRepository.findOne({
            where: {
                token: Equal(token),
                expire_at: MoreThan(now)
            }
        })
        if(!auth) throw new ForbiddenException();

        if(auth.user_id !== user_id) throw new ForbiddenException();

               
        
    }
}
