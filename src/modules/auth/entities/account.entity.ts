import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('account')
export class AccountEntity {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ type: 'varchar' })
  accountId: string;

  @Column({ type: 'varchar' })
  providerId: string;

  @Column({ type: 'varchar' })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.accounts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ type: 'text', nullable: true })
  accessToken: string;

  @Column({ type: 'text', nullable: true })
  refreshToken: string;

  @Column({ type: 'text', nullable: true })
  idToken: string;

  @Column({ type: 'timestamp', nullable: true })
  accessTokenExpiresAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  refreshTokenExpiresAt: Date;

  @Column({ type: 'varchar', nullable: true })
  scope: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}