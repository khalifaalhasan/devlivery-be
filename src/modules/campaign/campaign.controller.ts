import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { TenantGuard } from 'src/common/guards/tenant.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Campaign')
@ApiBearerAuth()
@Controller('campaign')
@UseGuards(TenantGuard, RolesGuard)
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  @Roles(Role.OWNER, Role.ADMIN, Role.MANAGER)
  create(@Body() createCampaignDto: CreateCampaignDto) {
    return this.campaignService.create(createCampaignDto);
  }

  @Get()
  @Roles(Role.OWNER, Role.ADMIN, Role.MANAGER, Role.VIEWER)
  findAll() {
    return this.campaignService.findAll();
  }

  @Get(':id')
  @Roles(Role.OWNER, Role.ADMIN, Role.MANAGER, Role.VIEWER)
  findOne(@Param('id') id: string) {
    return this.campaignService.findOne(+id);
  }

  @Get(':id/form')
  @Roles(Role.OWNER, Role.ADMIN, Role.MANAGER, Role.VIEWER)
  findForm(@Param('id') id: string) {
    return this.campaignService.findForm(+id);
  }

  @Patch(':id')
  @Roles(Role.OWNER, Role.ADMIN, Role.MANAGER)
  update(@Param('id') id: string, @Body() updateCampaignDto: UpdateCampaignDto) {
    return this.campaignService.update(+id, updateCampaignDto);
  }

  @Delete(':id')
  @Roles(Role.OWNER)
  remove(@Param('id') id: string) {
    return this.campaignService.remove(+id);
  }
}
