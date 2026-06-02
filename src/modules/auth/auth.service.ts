import {
  Injectable,
  Inject,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { BETTER_AUTH } from './better-auth.provider';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(BETTER_AUTH)
    private readonly auth: any,
    
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async register(dto: RegisterDto) {
    try {
      const userResponse = await this.auth.api.signUpEmail({
        body: {
          email: dto.email,
          password: dto.password,
          name: dto.name,
        },
      });

      const orgResponse = await this.auth.api.createOrganization({
        body: {
          name: dto.orgName,
          slug: dto.orgSlug,
        },
        // Melewatkan konteks user yang baru dibuat agar terikat sebagai owner
        headers: new Headers({
          Authorization: `Bearer ${userResponse.token}`,
        }),
      });

      // Mengeset organisasi yang baru dibuat sebagai organisasi aktif di sesi saat ini
      await this.auth.api.setActiveOrganization({
        body: {
          organizationId: orgResponse.id,
        },
        headers: new Headers({
          Authorization: `Bearer ${userResponse.token}`,
        }),
      });

      return {
        message:
          'Registrasi organisasi dan user admin berhasil via Better Auth',
        user: userResponse.user,
        organization: orgResponse,
      };
    } catch (error) {
      if (error.code === 'USER_ALREADY_EXISTS' || error.status === 422) {
        throw new ConflictException(
          'Email atau slug organisasi sudah terdaftar',
        );
      }
      throw error;
    }
  }

  async login(dto: LoginDto) {
    try {
      const loginResponse = await this.auth.api.signInEmail({
        body: {
          email: dto.email,
          password: dto.password,
        },
      });

      // Otomatis memilih organisasi pertama milik user sebagai workspace aktif
      const orgs = await this.auth.api.listOrganizations({
        headers: new Headers({
          Authorization: `Bearer ${loginResponse.token}`,
        }),
      });

      let activeOrganization = null;
      if (orgs && orgs.length > 0) {
        activeOrganization = orgs[0];
        await this.auth.api.setActiveOrganization({
          body: {
            organizationId: orgs[0].id,
          },
          headers: new Headers({
            Authorization: `Bearer ${loginResponse.token}`,
          }),
        });
      }

      const dbUser = await this.userRepository.findOne({ where: { email: dto.email } });
      const isGodMode = dbUser?.isSuperAdmin;

      const welcomeMessage = isGodMode 
        ? '👑 Selamat datang kembali, Yang Mulia Supreme God Emperor of Devlivery. Seluruh server berlutut menanti titah Anda.'
        : 'Login berhasil, selamat datang di Devlivery.';

      return {
        message: welcomeMessage,
        access_token: loginResponse.token,
        user: loginResponse.user,
        activeOrganization,
      };
    } catch (error) {
      console.error('Better Auth Login Error:', error);
      throw new UnauthorizedException({
        message: 'Kredensial login yang Anda masukkan salah',
        details: error instanceof Error ? error.message : error,
      });
    }
  }
}
