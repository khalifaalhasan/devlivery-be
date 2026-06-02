import { Column, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

export abstract class TenantBaseEntity extends BaseEntity {
  @Index() 
  @Column({ type: 'varchar', name: 'organization_id', nullable: false })
  organizationId: string;
}