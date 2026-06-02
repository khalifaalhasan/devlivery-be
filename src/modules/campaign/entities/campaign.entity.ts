import { Entity, Column, Index, OneToMany } from 'typeorm';
import { CampaignStatus } from '../../../common/enums/campaign-status.enum';
import { TenantBaseEntity } from '../../../common/entities/tenant-base.entity';
import { FormFieldEntity } from './form-field.entity';
import { FormSubmissionEntity } from './form-submission.entity';


@Entity('campaign')
@Index('idx_campaign_org_slug', ['organizationId', 'slug'], { unique: true })
export class CampaignEntity extends TenantBaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', name: 'cover_image_url', nullable: true })
  coverImageUrl: string;

  @Column({ type: 'timestamp', name: 'event_date', nullable: true })
  eventDate: Date;

  @Column({ type: 'varchar', nullable: true })
  location: string;

  @Column({ 
    type: 'enum', 
    enum: CampaignStatus, 
    default: CampaignStatus.DRAFT 
  })
  status: CampaignStatus;

  @Column({ type: 'varchar', name: 'qr_code_token', unique: true })
  qrCodeToken: string;

  @Column({ type: 'varchar', name: 'qr_code_url', nullable: true })
  qrCodeUrl: string;

  @Column({ type: 'timestamp', name: 'attendance_open_at', nullable: true })
  attendanceOpenAt: Date;

  @Column({ type: 'timestamp', name: 'attendance_close_at', nullable: true })
  attendanceCloseAt: Date;

  // Relasi Modul
  @OneToMany(() => FormFieldEntity, (field) => field.campaign, { cascade: true })
  formFields: FormFieldEntity[];

  @OneToMany(() => FormSubmissionEntity, (submission) => submission.campaign)
  submissions: FormSubmissionEntity[];
}