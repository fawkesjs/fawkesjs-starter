import * as express from "express";
import { Config, ICtrl, Orm } from "fawkesjs";
import { Template } from "../lib";

export class MainController {
  public static api(ctrl: ICtrl): void {
    ctrl.res.json({ "uptime": process.uptime() });
  }
  public static index(ctrl: ICtrl): void {
    ctrl.res.render(Template.GUEST, Template.page("index"));
  }
}
