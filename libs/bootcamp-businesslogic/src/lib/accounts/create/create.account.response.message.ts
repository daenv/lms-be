import { Account } from '@app/bootcamp-entities';
import { IResponseMessage } from '../../common/interfaces/response-message.interface';
import { IValidationResult } from '../../common/interfaces/validation-result.interface';

export class CreateAccountsResponseMessage implements IResponseMessage {
  private readonly _validationResult: IValidationResult;
  private readonly _response: Account;

  constructor(validationResult: IValidationResult, response: Account = null) {
    this._validationResult = validationResult;
    this._response = response;
  }
  public get validationResult(): IValidationResult {
    return this._validationResult;
  }
  public get response(): Account {
    return this._response;
  }
}
