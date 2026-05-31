import { Entity, Column, Index, ManyToOne, JoinColumn } from 'typeorm';
import { TenantBaseEntity } from '../../../common/entities/tenant-base.entity';
import { DeliveryJobEntity } from '../../attendance/entities/delivery-job.entity';
import { FormSubmissionEntity } from '../../campaign/entities/form-submission.entity';
import { CampaignEntity } from '../../campaign/entities/campaign.entity';

@Entity('email_log')
@Index('uq_email_per_job', ['deliveryJobId', 'submissionId'], { unique: true })
export class EmailLogEntity extends TenantBaseEntity {
  @Column({ type: 'varchar', name: 'delivery_job_id' })
  deliveryJobId: string;

  @Column({ type: 'varchar', name: 'submission_id' })
  submissionId: string;

  @Column({ type: 'varchar', name: 'campaign_id' })
  campaignId: string;

  @Column({ type: 'varchar', name: 'recipient_name', nullable: true })
  recipientName: string | null;

  @Column({ type: 'varchar', name: 'recipient_email' })
  recipientEmail: string;

  @Index('idx_emaillog_status')
  @Column({ type: 'varchar', default: 'pending' })
  status: string;

  @Column({ type: 'timestamp', name: 'sent_at', nullable: true })
  sentAt: Date | null;

  @Column({ type: 'text', name: 'error_message', nullable: true })
  errorMessage: string | null;

  @Column({ type: 'int', name: 'retry_count', default: 0 })
  retryCount: number;

  @Column({ type: 'varchar', name: 'certificate_file_url', nullable: true })
  certificateFileUrl: string | null;

  // Relasi
  @ManyToOne(() => DeliveryJobEntity, (job) => job.logs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'delivery_job_id' })
  deliveryJob: DeliveryJobEntity;

  @ManyToOne(() => FormSubmissionEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'submission_id' })
  submission: FormSubmissionEntity;

  @ManyToOne(() => CampaignEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'campaign_id' })
  campaign: CampaignEntity;
}
