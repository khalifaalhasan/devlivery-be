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
import { UserEntity } from '../../modules/auth/entities/user.entity';
import { Request } from 'express';

export interface SuperadminRequest extends Request {
  userId: string;
  token: string;
}

@Injectable()
export class SuperadminGuard implements CanActivate {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<SuperadminRequest>();

    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token autentikasi tidak ditemukan');
    }

    const token = authHeader.split(' ')[1];

    const session = await this.sessionRepository.findOne({
      where: { token },
    });

    if (!session || session.expiresAt < new Date()) {
      throw new UnauthorizedException('Sesi tidak valid atau telah kedaluwarsa');
    }

    const user = await this.userRepository.findOne({
      where: { id: session.userId },
    });

    if (!user || !user.isSuperAdmin) {
      throw new ForbiddenException(
        'Akses ditolak. Anda tidak memiliki otorisasi tingkat Superadmin.',
      );
    }

    request.userId = user.id;
    request.token = token;

    return true;
  }
}
