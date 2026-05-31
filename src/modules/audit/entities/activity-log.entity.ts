import { Entity, Column, Index } from 'typeorm';
import { TenantBaseEntity } from '../../../common/entities/tenant-base.entity';

@Entity('activity_log')
export class ActivityLogEntity extends TenantBaseEntity {
  @Column({ type: 'varchar', name: 'actor_user_id', nullable: true })
  actorUserId: string | null; // Null jika dilakukan oleh kolaborator via share link

  @Column({ type: 'varchar', name: 'share_link_id', nullable: true })
  shareLinkId: string | null; // Terisi jika aksi via token kolaborator

  @Column({ type: 'varchar', name: 'campaign_id', nullable: true })
  campaignId: string | null;

  @Column({ type: 'varchar' })
  action: string; 

  @Column({ type: 'varchar', name: 'resource_type', nullable: true })
  resourceType: string | null; 

  @Column({ type: 'varchar', name: 'resource_id', nullable: true })
  resourceId: string | null;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any> | null; 

  @Column({ type: 'varchar', name: 'ip_address', nullable: true })
  ipAddress: string | null;
}