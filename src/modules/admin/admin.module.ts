import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UserEntity } from '../auth/entities/user.entity';
import { OrganizationEntity } from '../organization/entities/organization.entity';
import { SessionEntity } from '../auth/entities/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, OrganizationEntity, SessionEntity])],
  providers: [AdminService],
  controllers: [AdminController]
  
})
export class AdminModule {}
