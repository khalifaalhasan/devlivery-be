import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('account')
export class AccountEntity {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ type: 'varchar', name: 'account_id' })
  accountId: string;

  @Column({ type: 'varchar', name: 'provider_id' })
  providerId: string;

  @Column({ type: 'varchar', name: 'user_id' })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.accounts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ type: 'text', name: 'access_token', nullable: true })
  accessToken: string;

  @Column({ type: 'text', name: 'refresh_token', nullable: true })
  refreshToken: string;

  @Column({ type: 'text', name: 'id_token', nullable: true })
  idToken: string;

  @Column({ type: 'timestamp', name: 'access_token_expires_at', nullable: true })
  accessTokenExpiresAt: Date;

  @Column({ type: 'timestamp', name: 'refresh_token_expires_at', nullable: true })
  refreshTokenExpiresAt: Date;

  @Column({ type: 'varchar', nullable: true })
  scope: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}