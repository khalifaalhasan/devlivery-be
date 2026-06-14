import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InviteUserDto } from './dto/invite-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../auth/entities/user.entity';
import { MemberEntity } from '../organization/entities/member.entity';
import { BETTER_AUTH } from '../auth/better-auth.provider';

@Injectable()
export class UserService {
  constructor(
    @Inject(BETTER_AUTH)
    private readonly auth: any,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(MemberEntity)
    private readonly memberRepository: Repository<MemberEntity>,
  ) {}

  async findAllByTenant(tenantId: string) {
    const members = await this.memberRepository.find({
      where: { organizationId: tenantId },
      relations: {user:true}, 
    });
    return members;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async inviteMember(token: string, tenantId: string, inviteUserDto: InviteUserDto) {
    try {
      const response = await this.auth.api.createInvitation({
        body: {
          email: inviteUserDto.email,
          role: inviteUserDto.role,
          organizationId: tenantId,
        },
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      });
      return { message: 'Berhasil mengirim undangan', data: response };
    } catch (error) {
      throw new BadRequestException(error.message || 'Gagal mengundang user');
    }
  }

  async updateMemberRole(token: string, tenantId: string, memberId: string, role: string) {
    try {
      const response = await this.auth.api.updateMemberRole({
        body: {
          memberId: memberId,
          role: role,
          organizationId: tenantId,
        },
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      });
      return { message: 'Berhasil mengupdate role', data: response };
    } catch (error) {
      throw new BadRequestException(error.message || 'Gagal mengupdate role user');
    }
  }

  async removeMember(token: string, tenantId: string, memberId: string) {
    try {
      const response = await this.auth.api.removeMember({
        body: {
          memberIdOrEmail: memberId,
          organizationId: tenantId,
        },
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      });
      return { message: 'Berhasil menghapus user dari organisasi', data: response };
    } catch (error) {
      throw new BadRequestException(error.message || 'Gagal menghapus user');
    }
  }
}
