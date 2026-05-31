import { Entity, Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { TenantBaseEntity } from '../../../common/entities/tenant-base.entity';
import { CampaignEntity } from '../../campaign/entities/campaign.entity';

import { UserEntity } from '../../auth/entities/user.entity';
import { CertificateElementEntity } from './certificate-element.entity';

@Entity('certificate_template')
export class CertificateTemplateEntity extends TenantBaseEntity {
  @Column({ type: 'varchar', name: 'campaign_id', unique: true })
  campaignId: string;

  @Column({ type: 'varchar', name: 'background_image_url' })
  backgroundImageUrl: string;

  @Column({ type: 'varchar', name: 'output_format', default: 'pdf' })
  outputFormat: string; // pdf | png

  @Column({ type: 'int', name: 'width_px', default: 2480 })
  widthPx: number;

  @Column({ type: 'int', name: 'height_px', default: 1754 })
  heightPx: number;

  @Column({ type: 'varchar', name: 'last_edited_by', nullable: true })
  lastEditedBy: string | null;

  // Relasi
  @OneToOne(() => CampaignEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'campaign_id' })
  campaign: CampaignEntity;

  @OneToMany(() => CertificateElementEntity, (element) => element.certificateTemplate, { cascade: true })
  elements: CertificateElementEntity[];

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'last_edited_by' })
  editor: UserEntity | null;
}