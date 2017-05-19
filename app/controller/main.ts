import * as express from "express";
import { Config, ICtrl, Orm } from "fawkesjs";
import { Template } from "../lib";

export class MainController {
  public static api(ctrl: ICtrl): Promise<any> {
    ctrl.res.json({ uptime: process.uptime() });
    return Promise.resolve({});
  }
  public static index(ctrl: ICtrl): Promise<any> {
    ctrl.res.render(Template.GUEST, Template.page("index"));
    return Promise.resolve({});
  }
}
