import { AbstractEntity } from '@app/common';

export class Account extends AbstractEntity<Account> {
  public username: string;
  public email: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public phone: string;
  public pw: string;
  public pwSame: string;
  public jwtToken: string;
  public refreshToken: string;
  public roles: string[];
  public verification: string;
  public verified: boolean;
  public verificationExpires: Date;
  public loginAttempts?: number;
  public blockExpires?: Date;
}
