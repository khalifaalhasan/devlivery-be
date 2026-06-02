import {
  Injectable,
  Inject,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { BETTER_AUTH } from './better-auth.provider';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(BETTER_AUTH)
    private readonly auth: any,
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

      return {
        access_token: loginResponse.token,
        user: loginResponse.user,
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
