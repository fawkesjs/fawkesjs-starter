import { BaseError } from "fawkesjs";
import { MyErrorCode } from "../const";
export class AccountError {
  public static emailPasswordError() {
    return new BaseError(MyErrorCode.EMAIL_LOGIN_ERROR, 401);
  }
  public static databaseError() {
    return new BaseError(MyErrorCode.DB_ERROR, 500);
  }
}
