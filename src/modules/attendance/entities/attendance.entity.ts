import { Entity, Column, Index, ManyToOne, JoinColumn } from 'typeorm';
import { TenantBaseEntity } from '../../../common/entities/tenant-base.entity';
import { CampaignEntity } from '../../campaign/entities/campaign.entity';
import { FormSubmissionEntity } from '../../campaign/entities/form-submission.entity';
import { UserEntity } from '../../auth/entities/user.entity';

@Entity('attendance_record')
@Index('uq_attendance_per_submission', ['campaignId', 'submissionId'], { unique: true })
export class AttendanceRecordEntity extends TenantBaseEntity {
  @Column({ type: 'varchar', name: 'campaign_id' })
  campaignId: string;

  @Column({ type: 'varchar', name: 'submission_id' })
  submissionId: string;

  @Column({ type: 'timestamp', name: 'scanned_at', default: () => 'CURRENT_TIMESTAMP' })
  scannedAt: Date;

  @Column({ type: 'varchar', default: 'qr' })
  method: string; 

  @Column({ type: 'varchar', name: 'marked_by', nullable: true })
  markedBy: string | null; 
  @Column({ type: 'varchar', name: 'device_info', nullable: true })
  deviceInfo: string | null;

  // Relasi
  @ManyToOne(() => CampaignEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'campaign_id' })
  campaign: CampaignEntity;

  @ManyToOne(() => FormSubmissionEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'submission_id' })
  submission: FormSubmissionEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'marked_by' })
  adminUser: UserEntity | null;
}