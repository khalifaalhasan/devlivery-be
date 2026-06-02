import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { OrganizationEntity } from './organization.entity';
import { UserEntity } from '../../auth/entities/user.entity';

@Entity('member')
@Index('uq_org_member', ['organizationId', 'userId'], { unique: true })
export class MemberEntity {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ type: 'varchar' })
  organizationId: string;

  @Column({ type: 'varchar' })
  userId: string;

  @Column({ type: 'varchar' })
  role: string; // owner | admin | manager | viewer

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // Relasi ke Organization
  @ManyToOne(() => OrganizationEntity, (org) => org.members, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organizationId' })
  organization: OrganizationEntity;

  // Relasi ke User
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}