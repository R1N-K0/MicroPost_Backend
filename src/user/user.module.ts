import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from 'src/entities/auth.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auth, User])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
