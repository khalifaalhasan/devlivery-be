import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import type { AuthRequest } from 'src/common/guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Organizations')
@ApiBearerAuth()
@Controller('organizations')
@UseGuards(AuthGuard)
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new workspace/organization' })
  createWorkspace(@Req() req: AuthRequest, @Body() dto: CreateOrganizationDto) {
    return this.organizationService.createWorkspace(req.token, dto);
  }

  @Get('my-workspaces')
  @ApiOperation({ summary: 'List all workspaces/organizations for current user' })
  listMyWorkspaces(@Req() req: AuthRequest) {
    return this.organizationService.listMyWorkspaces(req.token);
  }

  @Post('switch/:id')
  @ApiOperation({ summary: 'Switch active workspace to a specific organization' })
  switchWorkspace(@Req() req: AuthRequest, @Param('id') organizationId: string) {
    return this.organizationService.switchWorkspace(req.token, organizationId);
  }
}
