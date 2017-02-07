import { ErrorCode } from 'fawkesjs'
export class Role {
  public static ADMIN = '89bab6c2-5534-475c-9878-6b733657ca24'
  public static USER = 'e3552a92-fc58-4de9-813d-033cb4018741'
}
export class MyErrorCode extends ErrorCode {
  public static EMAIL_LOGIN_ERROR = 10001
  public static DB_ERROR = 10002
}
