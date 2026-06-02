import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { BETTER_AUTH } from '../auth/better-auth.provider';
import { CreateOrganizationDto } from './dto/create-organization.dto';

@Injectable()
export class OrganizationService {
  constructor(
    @Inject(BETTER_AUTH)
    private readonly auth: any,
  ) {}

  async createWorkspace(token: string, dto: CreateOrganizationDto) {
    try {
      const orgResponse = await this.auth.api.createOrganization({
        body: {
          name: dto.name,
          slug: dto.slug,
        },
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      });

      // Otomatis pindah ke workspace baru ini
      await this.auth.api.setActiveOrganization({
        body: {
          organizationId: orgResponse.id,
        },
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      });

      return {
        message: 'Workspace berhasil dibuat dan diaktifkan',
        organization: orgResponse,
      };
    } catch (error) {
      if (error.code === 'ORGANIZATION_ALREADY_EXISTS' || error.status === 422) {
        throw new ConflictException('Slug organisasi sudah terdaftar');
      }
      throw error;
    }
  }

  async listMyWorkspaces(token: string) {
    const orgs = await this.auth.api.listOrganizations({
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    });
    return orgs;
  }

  async switchWorkspace(token: string, organizationId: string) {
    await this.auth.api.setActiveOrganization({
      body: {
        organizationId,
      },
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    });

    return {
      message: 'Berhasil pindah workspace',
      activeOrganizationId: organizationId,
    };
  }
}
