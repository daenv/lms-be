import { Column, Entity, Index } from 'typeorm';
import { IdEntity } from './base';
import { IAccountEntity } from './interface';
import { IsPhoneNumber } from 'class-validator';

@Entity({ name: 'account' })
export class AccountEntity extends IdEntity implements IAccountEntity {
  @Column({ type: 'varchar', length: 300 })
  @Index('IX_Account_Username', { unique: true })
  username: string;

  @Column({ type: 'varchar', length: 300 })
  @Index('IX_Account_Email', { unique: true })
  email: string;

  @Column({ type: 'varchar', length: 300 })
  firstName: string;
  @Column({ type: 'varchar', length: 300 })
  lastName: string;

  @Column({ type: 'varchar', length: 300 })
  @IsPhoneNumber('VN')
  phone: string;

  @Column({ type: 'varchar', length: 4069 })
  pw: string;

  @Column({ type: 'varchar', length: 4069 })
  pwSalt: string;

  @Index('IX_Account_Token')
  @Column({ type: 'varchar', length: 4069, nullable: true })
  jwtToken: string;

  @Index('IX_Account_RefreshToken')
  @Column({ type: 'varchar', length: 4069, nullable: true })
  refreshToken: string;

  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @Column({
    type: 'varchar',
    array: true,
    nullable: false,
    default: '{"user"}',
  })
  roles: string[];

  @Column({ type: 'varchar', nullable: true })
  verification: string;
  @Column({ type: 'varchar', nullable: false, default: () => 'LOCALTIMESTAMP' })
  verificationExpires: Date;

  @Column({ type: 'integer', nullable: true, default: 0 })
  loginAttempts?: number;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'LOCALTIMESTAMP',
  })
  blockExpires?: Date;
}
