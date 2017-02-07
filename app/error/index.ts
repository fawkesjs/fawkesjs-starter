import { IError } from "fawkesjs"
import { MyErrorCode } from "../ref"
export class AccountError {
  public static emailPasswordError: IError = {
    "statusCode": 401,
    "errorCode": MyErrorCode.EMAIL_LOGIN_ERROR
  }
  public static databaseError: IError = {
    "statusCode": 500,
    "errorCode": MyErrorCode.DB_ERROR
  }
}
