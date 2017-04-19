import { RestMiddleware } from "fawkesjs";
import { AccessTokenMiddleware } from "../module/accessToken/middleware";
import { AclMiddleware } from "../module/acl/middleware";
export let preCtrls = [
  AccessTokenMiddleware.verifyAsync,
  AclMiddleware.verifyAsync,
  RestMiddleware.processArgAsync,
];
