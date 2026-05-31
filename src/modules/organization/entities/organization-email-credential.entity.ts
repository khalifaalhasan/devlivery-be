import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { OrganizationEntity } from './organization.entity';

@Entity('organization_email_credential')
export class OrganizationEmailCredentialEntity extends BaseEntity {
  @Column({ type: 'varchar', name: 'organization_id', unique: true })
  organizationId: string;

  @Column({ type: 'varchar' })
  provider: string; 

  @Column({ type: 'text', name: 'google_access_token', nullable: true })
  googleAccessToken: string;

  @Column({ type: 'text', name: 'google_refresh_token', nullable: true })
  googleRefreshToken: string;

  @Column({ type: 'timestamp', name: 'google_token_expires_at', nullable: true })
  googleTokenExpiresAt: Date;

  @Column({ type: 'varchar', name: 'smtp_host', nullable: true })
  smtpHost: string;

  @Column({ type: 'int', name: 'smtp_port', nullable: true })
  smtpPort: number;

  @Column({ type: 'varchar', name: 'smtp_username', nullable: true })
  smtpUsername: string;

  @Column({ type: 'text', name: 'smtp_password', nullable: true })
  smtpPassword: string;

  @Column({ type: 'boolean', name: 'smtp_secure', default: true })
  smtpSecure: boolean;

  @OneToOne(() => OrganizationEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organization_id' })
  organization: OrganizationEntity;
}