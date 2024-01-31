import { Account, Mapper } from '@app/bootcamp-entities';
import { AccountEntity } from './model/account.entity';

export class AccountsDataEntityMapper extends Mapper<AccountEntity, Account> {
  mapFrom(source: AccountEntity): Account {
    return {
      id: source.id,
      username: source.username,
      email: source.email,
      firstName: source.firstName,
      lastName: source.lastName,
      phone: source.phone,
      pw: source.pw,
      pwSalt: source.pwSalt,
      jwtToken: source.jwtToken,
      refreshToken: source.refreshToken,
      roles: source.roles,
      verification: source.verification,
      verified: source.verified,
      verificationExpires: source.verificationExpires,
      loginAttempts: source.loginAttempts,
      blockExpires: source.blockExpires,
    } as Account;
  }
}
