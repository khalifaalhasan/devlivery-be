import { Entity, PrimaryColumn, Column, CreateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { MemberEntity } from './member.entity';
import { InvitationEntity } from './invitation.entity';


@Entity('organization')
export class OrganizationEntity {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  slug: string;

  @Column({ type: 'varchar', nullable: true })
  logo: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @Column({ type: 'varchar', default: 'free' })
  plan: string; 

  @Column({ type: 'int', name: 'email_quota_limit', default: 500 })
  emailQuotaLimit: number;

  @Column({ type: 'int', name: 'email_quota_used', default: 0 })
  emailQuotaUsed: number;

  @Column({ type: 'timestamp', name: 'quota_reset_at', nullable: true })
  quotaResetAt: Date;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive: boolean;

  @Column({ type: 'varchar', name: 'sender_email', nullable: true })
  senderEmail: string;

  @Column({ type: 'varchar', name: 'sender_name', nullable: true })
  senderName: string;

  // Relasi
  @OneToMany(() => MemberEntity, (member) => member.organization)
  members: MemberEntity[];

  @OneToMany(() => InvitationEntity, (invitation) => invitation.organization)
  invitations: InvitationEntity[];
}