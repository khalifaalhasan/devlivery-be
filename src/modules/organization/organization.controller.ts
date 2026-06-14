import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import type { AuthRequest } from 'src/common/guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TenantGuard } from 'src/common/guards/tenant.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import * as tenantRequestInterface from 'src/common/interfaces/tenant-request.interface';

@ApiTags('Organizations')
@ApiBearerAuth()
@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new workspace/organization' })
  createWorkspace(@Req() req: AuthRequest, @Body() dto: CreateOrganizationDto) {
    return this.organizationService.createWorkspace(req.token, dto);
  }

  @Get('my-workspaces')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'List all workspaces/organizations for current user' })
  listMyWorkspaces(@Req() req: AuthRequest) {
    return this.organizationService.listMyWorkspaces(req.token);
  }

  @Post('switch/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Switch active workspace to a specific organization' })
  switchWorkspace(@Req() req: AuthRequest, @Param('id') organizationId: string) {
    return this.organizationService.switchWorkspace(req.token, organizationId);
  }

  @Patch()
  @UseGuards(TenantGuard, RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN)
  @ApiOperation({ summary: 'Update active organization details' })
  updateOrganization(@Req() req: tenantRequestInterface.TenantRequest, @Body() dto: UpdateOrganizationDto) {
    return this.organizationService.updateOrganization(req.token, req.tenantId, dto);
  }

  @Delete()
  @UseGuards(TenantGuard, RolesGuard)
  @Roles(Role.OWNER)
  @ApiOperation({ summary: 'Delete active organization' })
  deleteOrganization(@Req() req: tenantRequestInterface.TenantRequest) {
    return this.organizationService.deleteOrganization(req.token, req.tenantId);
  }
}
