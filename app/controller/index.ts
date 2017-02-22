import * as express from "express";
import { ICtrl, Config, Orm } from "fawkesjs";
export { AccountController } from "./account";
export class IndexController {
  static async api(ctrl: ICtrl) {
    ctrl.res.json({ "port": Config.port, "accountId": ctrl.accountId });
  }
}
