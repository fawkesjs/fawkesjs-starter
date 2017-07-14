import { IError } from "fawkesjs";
import { MyErrorCode } from "../const";

export class CommonError {
  public static resultEmptyError: IError = {
    errorCode: MyErrorCode.RESULT_EMPTY_ERROR,
    statusCode: 400,
  };
}
