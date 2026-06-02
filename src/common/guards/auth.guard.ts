import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionEntity } from '../../modules/auth/entities/session.entity';
import { Request } from 'express';

export interface AuthRequest extends Request {
  userId: string;
  token: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthRequest>();

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

    // Hanya menyuntikkan informasi user dasar
    request.userId = session.userId;
    request.token = token;

    return true;
  }
}
