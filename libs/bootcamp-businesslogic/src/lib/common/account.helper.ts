import { Consts, Messages } from '@app/bootcamp-entities';
import { isLength } from 'validator';
const MIN_PASSWORD_LENGTH = Consts.MIN_PASSWORD_LENGTH;
const IP_INVALID = Messages.IP_INVALID;
const COUNTRY_INVALID = Messages.COUNTRY_INVALID;
const BROWSER_INVALID = Messages.BROWSER_INVALID;
const MIN_BROWSER_LENGTH = Consts.MIN_BROWSER_LENGTH;
const MIN_COUNTRY_LENGTH = Consts.MIN_COUNTRY_LENGTH;

export class AccountsHelper {
  public static isPassword(password: string) {
    return isLength(password, MIN_PASSWORD_LENGTH);
  }
  public static isPasswordMatch(pw: string, pwRepeat: string) {
    return pw === pwRepeat;
  }
}
