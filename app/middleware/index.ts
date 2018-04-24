import { BaseError, Helper, RestMiddleware } from "fawkesjs";
import * as _ from "underscore";
import { MyErrorCode } from "../const";
import { AccessTokenMiddleware } from "../module/accessToken/middleware";
import { AclMiddleware } from "../module/acl/middleware";
export let preCtrls = [
  AccessTokenMiddleware.verifyAsync,
  AclMiddleware.verifyAsync,
  RestMiddleware.processArgAsync,
];
export let errHandler = (err, res, req, di) => {
  let theErr: any = {};
  // tslint:disable-next-line no-console
  console.log(err);
  if (err instanceof BaseError) {
    theErr = {
      data: err.data,
      errorCode: err.errorCode,
    };
  } else {
    theErr = {
      errorCode: typeof err === "object" && typeof err.errorCode === "number" ? err.errorCode : 0,
    };
  }
  const statusCode = typeof err === "object" && typeof err.statusCode === "number" ?
    err.statusCode : 500;
  const errorCode = typeof err === "object" && typeof err.errorCode === "number" ?
    err.errorCode : 500;
  const mapping = {};
  mapping[MyErrorCode.ACL_ERROR] = "Authorization Error";
  mapping[MyErrorCode.REST_PARAM_ERROR] = "Incorrect Parameter";
  mapping[MyErrorCode.ACCESS_TOKEN_EXPIRED] = "Access Token Expired";
  mapping[MyErrorCode.RESULT_EMPTY_ERROR] = "Unable to find data";
  mapping[MyErrorCode.DB_ERROR] = "Error in Database";
  mapping[MyErrorCode.EMAIL_LOGIN_ERROR] = "Email or password incorrect";

  const message = typeof mapping[errorCode] !== "undefined" ? mapping[errorCode] : "Error Code: " + errorCode;
  theErr.message = message;
  res.status(statusCode).json(theErr);
};
