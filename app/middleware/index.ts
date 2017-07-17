import { Helper, RestMiddleware } from "fawkesjs";
import * as _ from "underscore";
import { MyErrorCode } from "../const";
import { AccessTokenMiddleware } from "../module/accessToken/middleware";
import { AclMiddleware } from "../module/acl/middleware";
export let preCtrls = [
  AccessTokenMiddleware.verifyAsync,
  AclMiddleware.verifyAsync,
  RestMiddleware.processArgAsync,
];
/**
 *
 * @param err
 * @param res
 * @param req you can know the language from req
 */
export let errHandler = (err, res, req) => {
  // tslint:disable-next-line no-console
  console.log(err);
  const theErr = _.clone(err);
  const statusCode = Helper.objGet(theErr, "statusCode", 500);
  delete theErr.statusCode;
  const errorCode = Helper.objGet(theErr, "errorCode", 0);
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
