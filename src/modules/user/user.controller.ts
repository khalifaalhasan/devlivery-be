import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Role } from 'src/common/enums/role.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { TenantGuard } from 'src/common/guards/tenant.guard';
import * as tenantRequestInterface from 'src/common/interfaces/tenant-request.interface';

@ApiTags('User')
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

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Roles(Role.OWNER, Role.ADMIN, Role.MANAGER, Role.VIEWER)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.OWNER, Role.ADMIN, Role.MANAGER)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.OWNER, Role.ADMIN, Role.MANAGER)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
