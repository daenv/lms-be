import { AbstractEntity } from '@app/common';
import { IsEmail, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class Account extends AbstractEntity<Account> {
  @Column()
  public username: string;

  @Column()
  @IsEmail()
  public email: string;
  @Column()
  public password: string;

  @Column()
  @IsString()
  public firstName: string;

  @Column()
  @IsString()
  public lastName: string;

  @Column()
  public phone: string;

  @Column()
  public pw: string;
  @Column()
  public pwSame: string;
  @Column()
  public jwtToken: string;

  @Column()
  public refreshToken: string;

  @Column()
  public roles: string[];

  @Column()
  public verification: string;

  @Column()
  public verified: boolean;

  @Column()
  public verificationExpires: Date;

  @Column()
  public loginAttempts?: number;

  @Column()
  public blockExpires?: Date;
}
