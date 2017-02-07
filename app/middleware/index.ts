import { AccessTokenMiddleware } from '../module/accessToken/middleware'
import { AclMiddleware } from '../module/acl/middleware'
import { RestMiddleware } from 'fawkesjs'
export let preCtrls = [
  AccessTokenMiddleware.verifyAsync,
  AclMiddleware.verifyAsync,
  RestMiddleware.processArgAsync
]
