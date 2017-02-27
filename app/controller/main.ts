import * as express from "express";
import { ICtrl, Config, Orm } from "fawkesjs";
import { Template } from "../lib";
export class MainController {
  static api(ctrl: ICtrl): void {
    ctrl.res.json({ "uptime": process.uptime() });
  }
  static index(ctrl: ICtrl): void {
    ctrl.res.render(Template.GUEST, Template.page('index'))
  }
}
