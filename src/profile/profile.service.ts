import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { profile } from 'console';
import { NotFoundError } from 'rxjs';
import { CreateProfileDto } from 'src/Dto/create-profile-dto';
import { ProfileDto } from 'src/Dto/profile-dto';
import { Auth } from 'src/entities/auth.entity';
import { Profile } from 'src/entities/profile';
import { User } from 'src/entities/user.entity';
import { Equal, MoreThan, Repository } from 'typeorm';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>,
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async getProfile(token: string, id: number){
        const now = new Date();
        const auth = await this.authRepository.findOne({
            where: {
                token: token,
                expire_at: MoreThan(now)
            }
        })

        if(!auth) throw new ForbiddenException();

        const profile = await this.profileRepository.findOne({
            where: {
                user: {id: Equal(id)}
            }
        })

        if(!profile) return;

        return profile
    }

    async updateOrCreateProfile(token: string,id: number, profileDto: ProfileDto){
        const {name, img, description} = profileDto        
        const now = new Date();
        const auth = await this.authRepository.findOne({
            where: {
                token: token,
                expire_at: MoreThan(now)
            }
        })

        if(!auth) throw new ForbiddenException();
        if(auth.user_id !== id) throw new ForbiddenException();
     

        const user = await this.userRepository.findOne({
            where: {
                id: Equal(id)
            }
        })

        if(!user) throw new NotFoundException();

        await this.userRepository.merge(user, {name})
        const updatedUser = await this.userRepository.save(user)
        const prevProfile = await this.profileRepository.findOne({
            where: {
                user: {
                    id: Equal(id)
                }
            }
        })

        if(!prevProfile){
            const newProfile = await this.profileRepository.create({description, img, user: {id: id}})
            const profile = await this.profileRepository.save(newProfile)
            return {
                user: updatedUser,
                profile: profile
            }
        } else {
            const updatedProfile = await this.profileRepository.merge(prevProfile, {description, img})
            const profile = await this.profileRepository.save(updatedProfile);
            return {
                user: updatedUser,
                profile: profile
            }
        }
    }
}
