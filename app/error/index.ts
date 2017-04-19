import { IError } from "fawkesjs";
import { MyErrorCode } from "../ref";
export class AccountError {
  public static emailPasswordError: IError = {
    "errorCode": MyErrorCode.EMAIL_LOGIN_ERROR,
    "statusCode": 401,
  };
  public static databaseError: IError = {
    "errorCode": MyErrorCode.DB_ERROR,
    "statusCode": 500,
  };
}
