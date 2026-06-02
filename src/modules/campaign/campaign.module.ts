import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { PublicCampaignController } from './public-campaign.controller';
import { AuthModule } from '../auth/auth.module';
import { OrganizationModule } from '../organization/organization.module';
import { CampaignEntity } from './entities/campaign.entity';
import { FormFieldEntity } from './entities/form-field.entity';
import { FormSubmissionEntity } from './entities/form-submission.entity';
import { FormSubmissionValueEntity } from './entities/form-submission-value.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CampaignEntity,
      FormFieldEntity,
      FormSubmissionEntity,
      FormSubmissionValueEntity,
    ]),
    AuthModule,
    OrganizationModule,
  ],
  controllers: [CampaignController, PublicCampaignController],
  providers: [CampaignService],
})
export class CampaignModule {}
