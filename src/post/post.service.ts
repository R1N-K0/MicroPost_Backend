import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Auth } from 'src/entities/auth.entity';
import { MicroPost } from 'src/entities/microposts.entity';
import { Equal, MoreThan, Repository } from 'typeorm';

type ResultType = {
    id: number;
    content: string;
    user_name: string;
    created_at: Date
}

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>,
        @InjectRepository(MicroPost)
        private readonly microPostsRepository: Repository<MicroPost>
    ){}

    async createPost(token: string, message: string){
        const now = new Date()
        const auth = await this.authRepository.findOne({
            where: {
                token: token,
                expire_at: MoreThan(now)
            }
        })

        if(!auth) throw new ForbiddenException();

        const record = {
            user_id: auth.user_id,
            content: message
        }

        return await this.microPostsRepository.save(record)
    }

    async getList(token: string, start: number = 0, nr_records: number = 1){
        const now = new Date()
        const auth = await this.authRepository.findOne({
            where: {
                token: token,
                expire_at: MoreThan(now)
            }
        })

        if(!auth) throw new ForbiddenException();

        const qb = this.microPostsRepository
        .createQueryBuilder("micro_post")
        .leftJoinAndSelect("user", "user", "user.id = micro_post.user_id" )
        .select([
            "micro_post.id as id",
            "user.name as name",
            "micro_post.content as content",
            "micro_post.created_at as created_at"
        ])
        .orderBy("micro_post.created_at","DESC")
        .offset(start)
        .limit(nr_records);

        const records = await qb.getRawMany<ResultType>();
        
        console.log(records)
        return records     


    }

    async deletePost(token: string, id: number) {
        const now = new Date()
        const auth = await this.authRepository.findOne({
            where: {
                token: Equal(token),
                expire_at: MoreThan(now)
            }
        })

        if(!auth) throw new ForbiddenException();

        const post = await this.microPostsRepository.findOne({
            where: {
                id: id
            }
        })

        if(!post) throw new NotFoundException();

        const user_id = auth.user_id
        if(user_id === post.user_id){
            return await this.microPostsRepository.delete(id)
        } else {
            throw new ForbiddenException()
        }
    }
}
