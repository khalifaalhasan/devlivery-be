import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../auth/entities/user.entity';
import { MemberEntity } from '../organization/entities/member.entity';
import { SessionEntity } from '../auth/entities/session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, MemberEntity, SessionEntity])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
