import { IRoute, IRoutesConfig } from "fawkesjs";
import { MainController } from "../controller";
import { AccessTokenMiddleware } from "../module/accessToken/middleware";
import { AclMiddleware } from "../module/acl/middleware";
import { Role } from "../ref";
export const config: IRoutesConfig = {
  preCtrls: [
    AccessTokenMiddleware.verifyAsync,
    AclMiddleware.verifyAsync,
  ],
  swagger: false,
};
export const routes: IRoute[] = [{
  func: MainController.index,
  method: "get",
  remote: "/",
}];
