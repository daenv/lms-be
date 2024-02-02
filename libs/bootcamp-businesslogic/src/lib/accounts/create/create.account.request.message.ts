import { IRequestMessage } from '../../common';

export class CreateAccountsRequestMessage implements IRequestMessage {
  public firstName: string;
  public lastName: string;
  public password: string;
  public passwordRepeat: string;
  public email: string;
}
