import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCampaignDto } from './create-campaign.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { CampaignStatus } from '../../../common/enums/campaign-status.enum';

export class UpdateCampaignDto extends PartialType(CreateCampaignDto) {
  @ApiProperty({ enum: CampaignStatus, required: false })
  @IsEnum(CampaignStatus)
  @IsOptional()
  status?: CampaignStatus;
}
