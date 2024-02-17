import { Consts, InetLocation, Messages } from '@app/bootcamp-entities';
import { isLength } from 'validator';
import { IValidationResult } from './interfaces';
import { isIPv4, isIPv6 } from 'net';
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
  public static isValidInetLocation(
    inetLocation: InetLocation,
    validationResult: IValidationResult,
  ) {
    if (!isIPv6(inetLocation.ip) && !isIPv4(inetLocation.ip)) {
      validationResult.errors.push(IP_INVALID);
      validationResult.isValid = false;
    }
    if (!isLength(inetLocation.country, MIN_COUNTRY_LENGTH)) {
      validationResult.errors.push(COUNTRY_INVALID);
      validationResult.isValid = false;
    }
    if (!isLength(inetLocation.browser, MIN_BROWSER_LENGTH)) {
      validationResult.errors.push(BROWSER_INVALID);
      validationResult.isValid = false;
    }
  }
}
