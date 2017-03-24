import * as express from "express";
import { AccountModel, AccessTokenModel } from "../model";
import { ICtrl, Config, Orm, Helper } from "fawkesjs";
import { IArgAccountFindById, IArgAccountLogin, IArgAccountRegister } from "../interface";
import { AccountError } from "../error";
import { Role } from "../ref";
export class AccountController {
  static async findMe(ctrl: ICtrl) {
    AccountModel.findByIdAsync(ctrl.accountId)
      .then(data => {
        ctrl.res.json(data);
      })
      .catch(err => {
        Helper.errCb(err, ctrl.res);
      })
  }
  static async findById(ctrl: ICtrl) {
    let arg: IArgAccountFindById = ctrl.arg
    AccountModel.findByIdAsync(arg.accountId)
      .then(data => {
        ctrl.res.json(data);
      })
      .catch(err => {
        Helper.errCb(err, ctrl.res);
      })
  }
  static async login(ctrl: ICtrl) {
    let arg: IArgAccountLogin = ctrl.arg
    AccountModel.loginAsync(arg)
      .then((data:any) => {
        if (arg.cookie === true) {
          let options = {
            maxAge: 1000 * 60 * 60 * 24 * 365, // would expire after 365 days
            httpOnly: true, // The cookie only accessible by the web server?
            signed: true // Indicates if the cookie should be signed
          }
          ctrl.res.cookie('authorization', data.id, options)
          ctrl.res.json({});
        } else {
          ctrl.res.json(data);
        }
      })
      .catch(err => {
        Helper.errCb(err, ctrl.res);
      })
  }
  static async register(ctrl: ICtrl) {
    let arg: IArgAccountRegister = ctrl.arg
    AccountModel.createAsync(arg, [Role.USER])
      .then(data => {
        ctrl.res.json({});
      })
      .catch(err => {
        Helper.errCb(err, ctrl.res);
      })
  }
  static async logout(ctrl: ICtrl) {
    let accessTokenIds = []
    let cookieAuthorization = ctrl.req.signedCookies ? ctrl.req.signedCookies.authorization : undefined
    if (typeof cookieAuthorization === 'string') {
      accessTokenIds.push(cookieAuthorization)
    }
    if (typeof ctrl.req.headers.authorization === 'string') {
      accessTokenIds.push(ctrl.req.headers.authorization)
    }
    try {
      await AccessTokenModel.deleteIdsAsync(accessTokenIds)
      if (cookieAuthorization) {
        ctrl.res.clearCookie("authorization")
      }
    } catch(err) {
      console.log(err)
    }
    ctrl.res.json({})
  }
}
