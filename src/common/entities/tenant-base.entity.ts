import { Column, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

export abstract class TenantBaseEntity extends BaseEntity {
  @Index('idx_tenant_isolation') 
  @Column({ type: 'varchar', name: 'organization_id', nullable: false })
  organizationId: string;
}