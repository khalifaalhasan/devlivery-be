import { Controller, Post, Get, Body, Param, NotFoundException } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { SubmitFormDto } from './dto/submit-form.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Public Campaigns')
@Controller('public/campaigns')
export class PublicCampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Get(':slug')
  @ApiOperation({ summary: 'Get campaign details and form schema for public access via slug' })
  async getPublicCampaign(@Param('slug') slug: string) {
    return this.campaignService.getPublicCampaignBySlug(slug);
  }

  @Post(':id/submit')
  @ApiOperation({ summary: 'Submit form response for a campaign' })
  @ApiResponse({ status: 201, description: 'Form submitted successfully.' })
  submitForm(@Param('id') id: string, @Body() submitFormDto: SubmitFormDto) {
    return this.campaignService.submitForm(id, submitFormDto);
  }
}
