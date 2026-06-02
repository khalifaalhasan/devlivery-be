import { Controller, Get, Post, Body, Patch, Put, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { UpdateFormFieldsDto } from './dto/update-form-fields.dto';
import { TenantGuard } from 'src/common/guards/tenant.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { TenantRequest } from 'src/common/interfaces/tenant-request.interface';

@ApiTags('Campaigns')
@ApiBearerAuth()
@Controller('campaigns')
@UseGuards(TenantGuard, RolesGuard)
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new campaign bounded to the current tenant' })
  @ApiResponse({ status: 201, description: 'Campaign successfully created.' })
  @Roles(Role.OWNER, Role.ADMIN, Role.MANAGER)
  create(@Req() req: TenantRequest, @Body() createCampaignDto: CreateCampaignDto) {
    return this.campaignService.create(req.tenantId, createCampaignDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all campaigns within the current tenant' })
  @ApiResponse({ status: 200, description: 'List of campaigns retrieved successfully.' })
  @Roles(Role.OWNER, Role.ADMIN, Role.MANAGER, Role.VIEWER)
  findAll(@Req() req: TenantRequest) {
    return this.campaignService.findAll(req.tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific campaign by ID' })
  @ApiResponse({ status: 200, description: 'Campaign retrieved successfully.' })
  @Roles(Role.OWNER, Role.ADMIN, Role.MANAGER, Role.VIEWER)
  findOne(@Req() req: TenantRequest, @Param('id') id: string) {
    return this.campaignService.findOne(req.tenantId, id);
  }

  @Get(':id/form')
  @ApiOperation({ summary: 'Get form template fields for a specific campaign' })
  @Roles(Role.OWNER, Role.ADMIN, Role.MANAGER, Role.VIEWER)
  getFormFields(@Req() req: TenantRequest, @Param('id') id: string) {
    return this.campaignService.getFormFields(req.tenantId, id);
  }

  @Put(':id/form')
  @ApiOperation({ summary: 'Update or create form fields schema in bulk' })
  @Roles(Role.OWNER, Role.ADMIN, Role.MANAGER)
  updateFormFields(
    @Req() req: TenantRequest, 
    @Param('id') id: string, 
    @Body() updateFormFieldsDto: UpdateFormFieldsDto
  ) {
    return this.campaignService.updateFormFields(req.tenantId, id, updateFormFieldsDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a campaign' })
  @Roles(Role.OWNER, Role.ADMIN, Role.MANAGER)
  update(@Req() req: TenantRequest, @Param('id') id: string, @Body() updateCampaignDto: UpdateCampaignDto) {
    return this.campaignService.update(req.tenantId, id, updateCampaignDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a campaign' })
  @Roles(Role.OWNER)
  remove(@Req() req: TenantRequest, @Param('id') id: string) {
    return this.campaignService.remove(req.tenantId, id);
  }
}
