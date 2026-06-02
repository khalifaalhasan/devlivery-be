import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { MemberEntity } from './entities/member.entity';
import { OrganizationEntity } from './entities/organization.entity';
import { InvitationEntity } from './entities/invitation.entity';
import { OrganizationEmailCredentialEntity } from './entities/organization-email-credential.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MemberEntity, OrganizationEntity, InvitationEntity, OrganizationEmailCredentialEntity]),
    AuthModule,
  ],
  controllers: [OrganizationController],
  providers: [OrganizationService],
  exports: [TypeOrmModule],
})
export class OrganizationModule {}
