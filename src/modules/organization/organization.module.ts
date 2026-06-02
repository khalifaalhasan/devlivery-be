import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { MemberEntity } from './entities/member.entity';
import { OrganizationEntity } from './entities/organization.entity';
import { InvitationEntity } from './entities/invitation.entity';
import { OrganizationEmailCredentialEntity } from './entities/organization-email-credential.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MemberEntity, OrganizationEntity, InvitationEntity, OrganizationEmailCredentialEntity])],
  controllers: [OrganizationController],
  providers: [OrganizationService],
  exports: [TypeOrmModule],
})
export class OrganizationModule {}
