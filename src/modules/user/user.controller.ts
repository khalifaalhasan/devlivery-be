import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InviteUserDto } from './dto/invite-user.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Role } from 'src/common/enums/role.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { TenantGuard } from 'src/common/guards/tenant.guard';
import * as tenantRequestInterface from 'src/common/interfaces/tenant-request.interface';

@ApiTags('User Management')
@Controller('user')
@ApiBearerAuth()
@UseGuards(TenantGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved current user.' })
  @Roles(Role.OWNER, Role.ADMIN, Role.MANAGER, Role.VIEWER)
  getMe(@Req() req: tenantRequestInterface.TenantRequest) {
    return this.userService.findOne(req.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all members of the active organization/tenant' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved members.' })
  @Roles(Role.OWNER, Role.ADMIN, Role.MANAGER)
  findAll(@Req() req: tenantRequestInterface.TenantRequest) {
    return this.userService.findAllByTenant(req.tenantId);
  }

  @Post('invite')
  @ApiOperation({ summary: 'Invite a new user to the organization' })
  @Roles(Role.OWNER, Role.ADMIN)
  invite(@Req() req: tenantRequestInterface.TenantRequest, @Body() inviteUserDto: InviteUserDto) {
    return this.userService.inviteMember(req.token, req.tenantId, inviteUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Roles(Role.OWNER, Role.ADMIN, Role.MANAGER, Role.VIEWER)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id/role')
  @ApiOperation({ summary: 'Update a member role' })
  @Roles(Role.OWNER, Role.ADMIN)
  updateRole(@Req() req: tenantRequestInterface.TenantRequest, @Param('id') memberId: string, @Body('role') role: string) {
    return this.userService.updateMemberRole(req.token, req.tenantId, memberId, role);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a member from the organization' })
  @Roles(Role.OWNER, Role.ADMIN)
  remove(@Req() req: tenantRequestInterface.TenantRequest, @Param('id') memberId: string) {
    return this.userService.removeMember(req.token, req.tenantId, memberId);
  }
}
