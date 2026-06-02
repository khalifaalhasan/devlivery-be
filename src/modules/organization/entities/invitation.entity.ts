import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { OrganizationEntity } from './organization.entity';
import { UserEntity } from '../../auth/entities/user.entity';

@Entity('invitation')
export class InvitationEntity {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ type: 'varchar' })
  organizationId: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  role: string; // admin | manager | viewer

  @Column({ type: 'varchar', default: 'pending' })
  status: string; // pending | accepted | rejected | expired

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @Column({ type: 'varchar' })
  inviterId: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // Relasi ke Organization
  @ManyToOne(() => OrganizationEntity, (org) => org.invitations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organizationId' })
  organization: OrganizationEntity;

  // Relasi ke User (Pengundang)
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'inviterId' })
  inviter: UserEntity;
}