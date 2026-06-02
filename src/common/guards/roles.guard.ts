import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { TenantRequest } from '../interfaces/tenant-request.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<TenantRequest>();
    const userRole = request.userRole;

    if (!userRole) {
      throw new ForbiddenException('Akses ditolak: Konteks peran pengguna tidak ditemukan');
    }

    const hasPermission = requiredRoles.includes(userRole as Role);
    if (!hasPermission) {
      throw new ForbiddenException(
        `Akses ditolak: Anda login sebagai [${userRole}], peran ini tidak memiliki izin untuk melakukan aksi ini`,
      );
    }

    return true;
  }
}