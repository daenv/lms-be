import { IRequestMessage } from './request-message.interface';
// import { IResponseMessage } from './response-message.interface';
import { IValidationResult } from './validation-result.interface';

export interface IValidator<
  TRequestMessage extends IRequestMessage,
  TValidationResult extends IValidationResult,
> {
  validate(request: TRequestMessage): TValidationResult;
}
