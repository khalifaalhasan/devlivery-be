import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new organization and user admin' })
  @ApiResponse({
    status: 201,
    description: 'Successfully registered.',
    schema: {
      example: {
        message: 'Registrasi organisasi dan user admin berhasil via Better Auth',
        user: {
          id: 'qgoepFhEUnsOnpNWiWNi2UXGxneF9O1N',
          name: 'Admin Final',
          email: 'admin_final@test.com',
          emailVerified: false,
          image: null,
          createdAt: '2026-06-01T12:12:29.764Z',
          updatedAt: '2026-06-01T12:12:29.764Z',
        },
        organization: {
          id: 'fwUBNU7QirWQ9ksyexCpZiqVQB4FE6KB',
          name: 'Org Final',
          slug: 'org-final-test',
          logo: null,
          createdAt: '2026-06-01T12:12:29.791Z',
          members: [
            {
              id: 'OaFuvs3pzsUFiNbRTt4zcIdzVFOrsZsB',
              organizationId: 'fwUBNU7QirWQ9ksyexCpZiqVQB4FE6KB',
              userId: 'qgoepFhEUnsOnpNWiWNi2UXGxneF9O1N',
              role: 'owner',
              createdAt: '2026-06-01T12:12:29.795Z',
            },
          ],
        },
      },
    },
  })
  @ApiResponse({ status: 409, description: 'Email or org slug already exists.' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 201,
    description: 'Successfully logged in.',
    schema: {
      example: {
        access_token: 'tEEi7930yyhJkqNIVijZQBwzxLVTBAut',
        user: {
          id: 'd9l6rdpqqX891K5nP8pdFwFFD1SJhjwn',
          name: 'Admin',
          email: 'admin@test.com',
          emailVerified: false,
          image: null,
          createdAt: '2026-06-01T12:07:08.767Z',
          updatedAt: '2026-06-01T12:07:08.767Z',
        },
        activeOrganization: {
          id: 'fwUBNU7QirWQ9ksyexCpZiqVQB4FE6KB',
          name: 'Org Final',
          slug: 'org-final-test',
          logo: null,
          createdAt: '2026-06-01T12:12:29.791Z',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
