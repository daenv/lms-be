import {
  Account,
  IRepository,
  IVerificaionGeneratorDependencies,
} from '@app/bootcamp-entities';
import { IRequestHandle } from '../../common/interfaces/request-handler.interface';
import { CreateAccountsResponseMessage } from './create.account.response.message';
import { CreateAccountsRequestMessage } from './create.accounts.request.message';
import { IValidator } from '../../common/interfaces/validator.interface';
import { CreateAccountsValidationResult } from './create.accounts.validation-result';

export class CreateAccountsInteractor
  implements
    IRequestHandle<CreateAccountsRequestMessage, CreateAccountsResponseMessage>
{
  private readonly _repository: IRepository<string, Account>;
  private readonly _validator: IValidator<
    CreateAccountsRequestMessage,
    CreateAccountsValidationResult
  >;
  private readonly _verificationGenerator: IVerificaionGeneratorDependencies;
  // fix
  private readonly _service: any;

  constructor(
    validator: IValidator<
      CreateAccountsRequestMessage,
      CreateAccountsValidationResult
    >,
    repository: IRepository<string, Account>,
    verificationGenerator: IVerificaionGeneratorDependencies,
  ) {
    this._repository = repository;
    this._validator = validator;
    this._verificationGenerator = verificationGenerator;
  }
  public async handle(
    request: CreateAccountsRequestMessage,
  ): Promise<CreateAccountsResponseMessage> {
    const validationResult: CreateAccountsValidationResult =
      this._validator.validate(request);
    if (!validationResult.isValid) {
      return new CreateAccountsResponseMessage(validationResult, null);
    }

    const useCaseResult = await this._service.execUseCase(request);
    return new CreateAccountsResponseMessage(validationResult, useCaseResult);
  }
}
