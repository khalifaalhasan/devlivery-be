import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { TenantBaseEntity } from '../../../common/entities/tenant-base.entity';
import { CampaignEntity } from '../../campaign/entities/campaign.entity';
import { UserEntity } from '../../auth/entities/user.entity';
import { EmailLogEntity } from '../../delivery/entities/email-log.entity';

@Entity('delivery_job')
export class DeliveryJobEntity extends TenantBaseEntity {
  @Column({ type: 'varchar', name: 'campaign_id' })
  campaignId: string;

  @Column({ type: 'varchar', name: 'triggered_by' })
  triggeredBy: string;

  @Column({ type: 'varchar', name: 'target_filter' })
  targetFilter: string; // all_registered | all_attended | manual_select

  @Column({ type: 'int', name: 'total_target', default: 0 })
  totalTarget: number;

  @Column({ type: 'int', name: 'total_sent', default: 0 })
  totalSent: number;

  @Column({ type: 'int', name: 'total_success', default: 0 })
  totalSuccess: number;

  @Column({ type: 'int', name: 'total_failed', default: 0 })
  totalFailed: number;

  @Column({ type: 'varchar', default: 'pending' })
  status: string;

  @Column({ type: 'timestamp', name: 'started_at', nullable: true })
  startedAt: Date | null;

  @Column({ type: 'timestamp', name: 'completed_at', nullable: true })
  completedAt: Date | null;

  @Column({ type: 'varchar', name: 'celery_task_id', nullable: true })
  celeryTaskId: string | null;

  @Column({ type: 'text', name: 'error_summary', nullable: true })
  errorSummary: string | null;
  @ManyToOne(() => CampaignEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'campaign_id' })
  campaign: CampaignEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'triggered_by' })
  executor: UserEntity;

  @OneToMany(() => EmailLogEntity, (log) => log.deliveryJob)
  logs: EmailLogEntity[];
}
