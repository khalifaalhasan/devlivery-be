import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { OrganizationEntity } from './organization.entity';
import { UserEntity } from '../../auth/entities/user.entity';

@Entity('member')
@Index('uq_org_member', ['organizationId', 'userId'], { unique: true })
export class MemberEntity {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ type: 'varchar', name: 'organization_id' })
  organizationId: string;

  @Column({ type: 'varchar', name: 'user_id' })
  userId: string;

  @Column({ type: 'varchar' })
  role: string; // owner | admin | manager | viewer

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  // Relasi ke Organization
  @ManyToOne(() => OrganizationEntity, (org) => org.members, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organization_id' })
  organization: OrganizationEntity;

  // Relasi ke User
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}