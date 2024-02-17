import {
  Account,
  Consts,
  IRepository,
  IVerificaionGeneratorDependencies,
  Messages,
} from '@app/bootcamp-entities';
import { CreateAccountsRequestMessage } from '../accounts';
import { EncryptUser } from './encrypt.user';
import {} from 'class-validator';
import { ValidationException } from './exceptions/validation.exception.interface';
import { AccountNotFoundException } from './exceptions/account-notfound.exception.interface';

export class AccountSerivce {
  HOURS_TO_VERIFY = Consts.HOURS_TO_VERIFY;
  private readonly _repository: IRepository<string, Account>;
  private readonly _verificationGenerator: IVerificaionGeneratorDependencies;
  constructor(
    _repository,
    _verificationGenerator: IVerificaionGeneratorDependencies,
  ) {
    this._repository = _repository;
    this._verificationGenerator = _verificationGenerator;
  }

  public async execUseCase(
    request: CreateAccountsRequestMessage,
  ): Promise<Account> {
    // handle request from the server
    const account = new Account();
    account.firstName = request.firstName;
    account.lastName = request.lastName;
    account.pw = request.password;
    account.email = request.email;

    const encrypUser = new EncryptUser();

    await encrypUser.encryptUser(account);
    // check email uniqueness
    this.isEmailUnique(account.email);
    // set registration information
    this.setRegistrationInfo(account);

    return await this._repository.save(account);
  }

  public async isEmailUnique(email: string) {
    const user = await this._repository.getByQuery({ email });
    if (user) {
      throw new ValidationException(Messages.EMAIL_MUST_BE_UNIQUE);
    }
  }
  public setRegistrationInfo(user): any {
    user.verification = this._verificationGenerator.createVerificationCode();
    user.verificationExpires = this._verificationGenerator.getExpirationDate(
      this.HOURS_TO_VERIFY,
    );
  }
  public async findByEmailOrThrowException(email: string): Promise<Account> {
    const user = await this._repository.getByQuery({ email });
    if (!user) {
      throw new AccountNotFoundException('Account not found');
    }
    return user;
  }
}
