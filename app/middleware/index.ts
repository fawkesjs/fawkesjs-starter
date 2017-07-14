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
  let message = "Error Code: " + errorCode;
  switch (errorCode) {
    case MyErrorCode.ACL_ERROR:
      message = "Authorization Error";
    case MyErrorCode.REST_PARAM_ERROR:
      message = "Incorrect Parameter";
    case MyErrorCode.ACCESS_TOKEN_EXPIRED:
      message = "Access Token Expired";
    case MyErrorCode.RESULT_EMPTY_ERROR:
      message = "Unable to find data";
    case MyErrorCode.DB_ERROR:
      message = "Error in Database";
    case MyErrorCode.EMAIL_LOGIN_ERROR:
      message = "Email or password incorrect";
  }
  theErr.message = message;
  res.status(statusCode).json(theErr);
};
