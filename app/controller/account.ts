import * as express from "express";
import { AccountModel } from "../model";
import { ICtrl, Config, Orm, Helper } from "fawkesjs";
import { IArgAccountFindById, IArgAccountLogin, IArgAccountRegister } from "../interface";
import { AccountError } from "../error";
export class AccountController {
  static findMe(ctrl: ICtrl): void {
    AccountModel.findByIdAsync(ctrl.accountId)
      .then(data => {
        ctrl.res.json(data);
      })
      .catch(err => {
        Helper.errCb(err, ctrl.res);
      })
  }
  static findById(ctrl: ICtrl): void {
    let arg: IArgAccountFindById = ctrl.arg
    AccountModel.findByIdAsync(arg.accountId)
      .then(data => {
        ctrl.res.json(data);
      })
      .catch(err => {
        Helper.errCb(err, ctrl.res);
      })
  }
  static login(ctrl: ICtrl): void {
    let arg: IArgAccountLogin = ctrl.arg
    AccountModel.loginAsync(arg)
      .then(data => {
        ctrl.res.json(data);
      })
      .catch(err => {
        Helper.errCb(err, ctrl.res);
      })
  }
  static register(ctrl: ICtrl): void {
    let arg: IArgAccountRegister = ctrl.arg
    AccountModel.createAsync(arg)
      .then(data => {
        ctrl.res.json({});
      })
      .catch(err => {
        Helper.errCb(err, ctrl.res);
      })
  }
}
