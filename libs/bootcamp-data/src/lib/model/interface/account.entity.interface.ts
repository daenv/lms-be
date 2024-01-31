import { IIdEntity } from './id.interface';

export interface IAccountEntity extends IIdEntity {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  pw: string;
  pwSalt: string;
  jwtToken: string;
  refreshToken: string;
  verified: boolean;
  roles: string[];
  verification: string;
  verificationExpires: Date;
  loginAttempts?: number;
  blockExpires?: Date;
}
