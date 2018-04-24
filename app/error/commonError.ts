import { BaseError } from "fawkesjs";
import { MyErrorCode } from "../const";

export class CommonError {
  public static resultEmptyError() {
    return new BaseError(MyErrorCode.RESULT_EMPTY_ERROR, 401);
  }
}
