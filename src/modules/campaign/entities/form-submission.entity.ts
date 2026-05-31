import { Entity, Column, Index, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { TenantBaseEntity } from '../../../common/entities/tenant-base.entity';
import { CampaignEntity } from './campaign.entity';
import { FormSubmissionValueEntity } from './form-submission-value.entity';

@Entity('form_submission')
@Index('uq_email_per_campaign', ['campaignId', 'respondentEmail'], { unique: true })
export class FormSubmissionEntity extends TenantBaseEntity {
  @Column({ type: 'varchar', name: 'campaign_id' })
  campaignId: string;

  @Column({ type: 'varchar', name: 'respondent_name', nullable: true })
  respondentName: string;

  @Column({ type: 'varchar', name: 'respondent_email' })
  respondentEmail: string;

  @Column({ type: 'boolean', name: 'is_registered', default: true })
  isRegistered: boolean;

  @Column({ type: 'timestamp', name: 'submitted_at', default: () => 'CURRENT_TIMESTAMP' })
  submittedAt: Date;

  @ManyToOne(() => CampaignEntity, (campaign) => campaign.submissions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'campaign_id' })
  campaign: CampaignEntity;

  @OneToMany(() => FormSubmissionValueEntity, (value) => value.submission, { cascade: true })
  values: FormSubmissionValueEntity[];
}