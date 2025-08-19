import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/entities/profile';
import { Auth } from 'src/entities/auth.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, Auth, User])],
  providers: [ProfileService],
  controllers: [ProfileController]
})
export class ProfileModule {}
