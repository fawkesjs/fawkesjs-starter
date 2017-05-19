import { RestMiddleware } from "fawkesjs";
import * as _ from "underscore";
import { AccessTokenMiddleware } from "../module/accessToken/middleware";
import { AclMiddleware } from "../module/acl/middleware";
export let preCtrls = [
  AccessTokenMiddleware.verifyAsync,
  AclMiddleware.verifyAsync,
  RestMiddleware.processArgAsync,
];
export let errHandler = (err, res) => {
  // tslint:disable-next-line no-console
  console.log(err);
  const theErr = _.clone(err);
  const statusCode = theErr.statusCode ? theErr.statusCode : 500;
  delete theErr.statusCode;
  res.status(statusCode).json(theErr);
};
