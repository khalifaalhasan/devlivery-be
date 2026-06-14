import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionEntity } from '../../modules/auth/entities/session.entity';
import { MemberEntity } from '../../modules/organization/entities/member.entity';
import { TenantRequest } from '../interfaces/tenant-request.interface';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,

    @InjectRepository(MemberEntity)
    private readonly memberRepository: Repository<MemberEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<TenantRequest>();

    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token autentikasi tidak ditemukan atau tidak valid');
    }

    const token = authHeader.split(' ')[1];

    const session = await this.sessionRepository.findOne({
      where: { token },
    });

    if (!session) {
      throw new UnauthorizedException('Sesi tidak ditemukan atau sudah log out');
    }

    const now = new Date();
    if (session.expiresAt < now) {
      throw new UnauthorizedException('Sesi telah kedaluwarsa, silakan login kembali');
    }

    // 4. Periksa apakah pengguna memiliki organisasi/tenant yang sedang aktif
    if (!session.activeOrganizationId) {
      throw new ForbiddenException(
        'Anda belum memilih atau masuk ke dalam ruang kerja (workspace) organisasi',
      );
    }

    // 5. Ambil peran (role) pengguna di organisasi tersebut untuk kebutuhan RBAC
    const member = await this.memberRepository.findOne({
      where: {
        organizationId: session.activeOrganizationId,
        userId: session.userId,
      },
    });

    if (!member) {
      throw new ForbiddenException('Anda bukan bagian dari organisasi ini');
    }

    // 6. Inject konteks secara aman ke dalam objek Request (Type-safe lewat TenantRequest)
    request.userId = session.userId;
    request.tenantId = session.activeOrganizationId;
    request.userRole = member.role; // owner | admin | manager | viewer
    request.token = token;

    return true;
  }
}