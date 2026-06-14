import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SessionEntity } from './entities/session.entity';
import { UserEntity } from './entities/user.entity';
import { AccountEntity } from './entities/account.entity';
import { VerificationEntity } from './entities/verification.entity';
import { BetterAuthProvider } from './better-auth.provider';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from 'src/database/database.config';

import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    ConfigModule.forFeature(databaseConfig),
    EmailModule,
    TypeOrmModule.forFeature([
      SessionEntity,
      UserEntity,
      AccountEntity,
      VerificationEntity,
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, BetterAuthProvider],
  exports: [TypeOrmModule, BetterAuthProvider],
})
export class AuthModule {}
