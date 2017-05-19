import { ErrorCode } from "fawkesjs";

export class MyErrorCode extends ErrorCode {
  public static EMAIL_LOGIN_ERROR = 10001;
  public static DB_ERROR = 10002;
  public static RESULT_EMPTY_ERROR = 10003;
}
