import { Entity, Column, Index, ManyToOne, JoinColumn } from 'typeorm';
import { TenantBaseEntity } from '../../../common/entities/tenant-base.entity';
import { CampaignEntity } from '../../campaign/entities/campaign.entity';
import { UserEntity } from '../../auth/entities/user.entity';

@Entity('share_link')
export class ShareLinkEntity extends TenantBaseEntity {
  @Column({ type: 'varchar', name: 'campaign_id' })
  campaignId: string;

  @Column({ type: 'varchar', name: 'created_by' })
  createdBy: string;

  @Index('idx_sharelink_token', { unique: true })
  @Column({ type: 'varchar' })
  token: string;

  @Column({ type: 'varchar', name: 'resource_type' })
  resourceType: string;

  @Column({ type: 'varchar', default: 'edit' })
  permission: string; 

  @Column({ type: 'varchar', nullable: true })
  label: string | null; 

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', name: 'expires_at', nullable: true })
  expiresAt: Date | null;

  @Column({ type: 'timestamp', name: 'last_accessed_at', nullable: true })
  lastAccessedAt: Date | null;

  @Column({ type: 'int', name: 'access_count', default: 0 })
  accessCount: number;

  @Column({ type: 'timestamp', name: 'revoked_at', nullable: true })
  revokedAt: Date | null;

  @Column({ type: 'varchar', name: 'revoked_by', nullable: true })
  revokedBy: string | null;

  // Relasi
  @ManyToOne(() => CampaignEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'campaign_id' })
  campaign: CampaignEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'created_by' })
  creator: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'revoked_by' })
  revoker: UserEntity | null;
}