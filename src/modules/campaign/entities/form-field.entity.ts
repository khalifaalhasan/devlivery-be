import { Entity, Column, Index, ManyToOne, JoinColumn } from 'typeorm';
import { TenantBaseEntity } from '../../../common/entities/tenant-base.entity';
import { CampaignEntity } from './campaign.entity';

@Entity('form_field')
@Index('uq_field_key_per_campaign', ['campaignId', 'fieldKey'], { unique: true })
export class FormFieldEntity extends TenantBaseEntity {
  @Column({ type: 'varchar', name: 'campaign_id' })
  campaignId: string;

  @Column({ type: 'varchar' })
  label: string;

  @Column({ type: 'varchar', name: 'field_key' })
  fieldKey: string;

  @Column({ type: 'varchar', name: 'field_type' })
  fieldType: string; // text | textarea | email | phone | radio | checkbox | dropdown | file | date

  @Column({ type: 'varchar', nullable: true })
  placeholder: string;

  @Column({ type: 'boolean', name: 'is_required', default: false })
  isRequired: boolean;

  @Column({ type: 'int', name: 'sort_order', default: 0 })
  sortOrder: number;

  @Column({ type: 'jsonb', nullable: true })
  options: string[] | Record<string, any> | null;

  @Column({ type: 'jsonb', nullable: true })
  validation: Record<string, any> | null;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive: boolean;

  @ManyToOne(() => CampaignEntity, (campaign) => campaign.formFields, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'campaign_id' })
  campaign: CampaignEntity;
}