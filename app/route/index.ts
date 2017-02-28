import { MainController } from "../controller";
import { IRoutes, IRoutesConfig } from "fawkesjs";
import { AccessTokenMiddleware } from '../module/accessToken/middleware'
import { AclMiddleware } from '../module/acl/middleware'
import { Role } from "../ref";
export const config: IRoutesConfig = {
  swagger: false,
  preCtrls: [
    AccessTokenMiddleware.verifyCookieAsync,
    AclMiddleware.verifyAsync
  ]
}
export const routes: IRoutes = [{
  remote: '/',
  func: MainController.index,
  method: 'get'
}]
