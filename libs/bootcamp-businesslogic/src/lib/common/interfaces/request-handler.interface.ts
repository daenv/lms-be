import { IRequestMessage } from './request-message.interface';
import { IResponseMessage } from './response-message.interface';

export interface IRequestHandle<
  TRequest extends IRequestMessage,
  TResponse extends IResponseMessage,
> {
  handle(request: TRequest): Promise<TResponse>;
}
