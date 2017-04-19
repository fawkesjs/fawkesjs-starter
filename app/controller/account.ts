import * as express from "express";
import { Config, Helper, ICtrl, Orm } from "fawkesjs";
import { AccountError } from "../error";
import { IArgAccountFindById, IArgAccountLogin, IArgAccountRegister } from "../interface";
import { AccessTokenModel, AccountModel } from "../model";
import { Role } from "../ref";

export class AccountController {
  public static async findMe(ctrl: ICtrl) {
    AccountModel.findByIdAsync(ctrl.accountId)
      .then((data) => {
        ctrl.res.json(data);
      })
      .catch((err) => {
        Helper.errCb(err, ctrl.res);
      });
  }
  public static async findById(ctrl: ICtrl) {
    const arg: IArgAccountFindById = ctrl.arg;
    AccountModel.findByIdAsync(arg.accountId)
      .then((data) => {
        ctrl.res.json(data);
      })
      .catch((err) => {
        Helper.errCb(err, ctrl.res);
      });
  }
  public static async login(ctrl: ICtrl) {
    const arg: IArgAccountLogin = ctrl.arg;
    AccountModel.loginAsync(arg)
      .then((data: any) => {
        if (arg.cookie === true) {
          const options = {
            httpOnly: true, // The cookie only accessible by the web server?
            maxAge: 1000 * 60 * 60 * 24 * 365, // would expire after 365 days
            signed: true, // Indicates if the cookie should be signed
          };
          ctrl.res.cookie("authorization", data.id, options);
          ctrl.res.json({});
        } else {
          ctrl.res.json(data);
        }
      })
      .catch((err) => {
        Helper.errCb(err, ctrl.res);
      });
  }
  public static async register(ctrl: ICtrl) {
    const arg: IArgAccountRegister = ctrl.arg;
    AccountModel.createAsync(arg, [Role.USER])
      .then((data) => {
        ctrl.res.json({});
      })
      .catch((err) => {
        Helper.errCb(err, ctrl.res);
      });
  }
  public static async logout(ctrl: ICtrl) {
    const accessTokenIds = [];
    const cookieAuthorization = ctrl.req.signedCookies ? ctrl.req.signedCookies.authorization : undefined;
    if (typeof cookieAuthorization === "string") {
      accessTokenIds.push(cookieAuthorization);
    }
    if (typeof ctrl.req.headers.authorization === "string") {
      accessTokenIds.push(ctrl.req.headers.authorization);
    }
    try {
      await AccessTokenModel.deleteIdsAsync(accessTokenIds);
      if (cookieAuthorization) {
        ctrl.res.clearCookie("authorization");
      }
    } catch (err) {
      // tslint:disable-next-line no-console
      console.log(err);    }
    ctrl.res.json({});
  }
}
