import { Controller, Get, Delete, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { SuperadminGuard } from 'src/common/guards/superadmin.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Superadmin')
@ApiBearerAuth()
@Controller('admin')
@UseGuards(SuperadminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('metrics')
  @ApiOperation({ summary: 'Get total users and organizations' })
  getMetrics() {
    return this.adminService.getMetrics();
  }

  @Get('users')
  @ApiOperation({ summary: 'List all active users in the platform' })
  getActiveUsers() {
    return this.adminService.getActiveUsers();
  }

  @Get('organizations')
  @ApiOperation({ summary: 'List all active organizations in the platform' })
  getActiveOrganizations() {
    return this.adminService.getActiveOrganizations();
  }

  @Delete('organizations/:id')
  @ApiOperation({ summary: 'Suspend/Delete an organization (God mode)' })
  suspendOrganization(@Param('id') id: string) {
    return this.adminService.suspendOrganization(id);
  }
}
