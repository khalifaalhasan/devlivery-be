import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../auth/entities/user.entity';
import { OrganizationEntity } from '../organization/entities/organization.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    
    @InjectRepository(OrganizationEntity)
    private readonly orgRepository: Repository<OrganizationEntity>,
  ) {}

  async getMetrics() {
    const totalUsers = await this.userRepository.count();
    const totalOrganizations = await this.orgRepository.count();

    return {
      totalUsers,
      totalOrganizations,
    };
  }

  async getActiveUsers() {
    return this.userRepository.find({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        isSuperAdmin: true,
      },
      order: { createdAt: 'DESC' },
    });
  }

  async getActiveOrganizations() {
    return this.orgRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async suspendOrganization(id: string) {
    const org = await this.orgRepository.findOne({ where: { id } });
    if (!org) throw new NotFoundException('Organisasi tidak ditemukan');
    
    // Asumsi soft delete
    return this.orgRepository.softRemove(org);
  }
}
