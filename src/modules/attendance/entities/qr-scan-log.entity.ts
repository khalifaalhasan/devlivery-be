import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TenantBaseEntity } from '../../../common/entities/tenant-base.entity';
import { CampaignEntity } from '../../campaign/entities/campaign.entity';
import { FormSubmissionEntity } from '../../campaign/entities/form-submission.entity';

@Entity('qr_scan_log')
export class QrScanLogEntity extends TenantBaseEntity {
  @Column({ type: 'varchar', name: 'campaign_id' })
  campaignId: string;

  @Column({ type: 'varchar', name: 'qr_code_token' })
  qrCodeToken: string;

  @Column({ type: 'timestamp', name: 'scanned_at', default: () => 'CURRENT_TIMESTAMP' })
  scannedAt: Date;

  @Column({ type: 'varchar', name: 'device_info', nullable: true })
  deviceInfo: string | null;

  @Column({ type: 'boolean', name: 'is_valid_registrant' })
  isValidRegistrant: boolean;

  @Column({ type: 'varchar', name: 'submission_id', nullable: true })
  submissionId: string | null;

  @ManyToOne(() => CampaignEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'campaign_id' })
  campaign: CampaignEntity;

  @ManyToOne(() => FormSubmissionEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'submission_id' })
  submission: FormSubmissionEntity | null;
}