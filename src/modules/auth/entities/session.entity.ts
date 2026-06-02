import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('session')
export class SessionEntity {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @Column({ type: 'varchar', unique: true })
  token: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'varchar', nullable: true })
  ipAddress: string;

  @Column({ type: 'varchar', nullable: true })
  userAgent: string;

  @Column({ type: 'varchar' })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.sessions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ type: 'varchar', nullable: true })
  activeOrganizationId: string;
}