import {
  Account,
  Consts,
  IRepository,
  IVerificaionGeneratorDependencies,
} from '@app/bootcamp-entities';

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
}
