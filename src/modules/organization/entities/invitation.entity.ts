import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { OrganizationEntity } from './organization.entity';
import { UserEntity } from '../../auth/entities/user.entity';

@Entity('invitation')
export class InvitationEntity {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ type: 'varchar', name: 'organization_id' })
  organizationId: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  role: string; // admin | manager | viewer

  @Column({ type: 'varchar', default: 'pending' })
  status: string; // pending | accepted | rejected | expired

  @Column({ type: 'timestamp', name: 'expires_at' })
  expiresAt: Date;

  @Column({ type: 'varchar', name: 'inviter_id' })
  inviterId: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  // Relasi ke Organization
  @ManyToOne(() => OrganizationEntity, (org) => org.invitations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organization_id' })
  organization: OrganizationEntity;

  // Relasi ke User (Pengundang)
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'inviter_id' })
  inviter: UserEntity;
}