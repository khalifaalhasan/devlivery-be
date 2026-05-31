import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { TenantBaseEntity } from '../../../common/entities/tenant-base.entity';
import { CampaignEntity } from '../../campaign/entities/campaign.entity';
import { UserEntity } from '../../auth/entities/user.entity';

@Entity('email_template')
export class EmailTemplateEntity extends TenantBaseEntity {
  @Column({ type: 'varchar', name: 'campaign_id', unique: true })
  campaignId: string;

  @Column({ type: 'varchar', nullable: true })
  subject: string | null;

  @Column({ type: 'text', name: 'body_html', nullable: true })
  bodyHtml: string | null;

  @Column({ type: 'varchar', name: 'confirmation_subject', nullable: true })
  confirmationSubject: string | null;

  @Column({ type: 'text', name: 'confirmation_body_html', nullable: true })
  confirmationBodyHtml: string | null;

  @Column({ type: 'varchar', name: 'header_image_url', nullable: true })
  headerImageUrl: string | null;

  @Column({ type: 'varchar', name: 'header_bg_color', default: '#ffffff' })
  headerBgColor: string;

  @Column({ type: 'text', name: 'footer_text', nullable: true })
  footerText: string | null;

  @Column({ type: 'varchar', name: 'last_edited_by', nullable: true })
  lastEditedBy: string | null;

  // Relasi
  @OneToOne(() => CampaignEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'campaign_id' })
  campaign: CampaignEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'last_edited_by' })
  editor: UserEntity | null;
}