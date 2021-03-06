import { ICtrl } from "fawkesjs";
import { IArgAccountFindById, IArgAccountLogin, IArgAccountRegister } from "../interface";
import { AccessTokenModel, AccountModel } from "../model";
import { Role } from "../ref";

export class AccountController {
  public static async findMe(ctrl: ICtrl): Promise<any> {
    const accountModel = new AccountModel(ctrl.di);
    return accountModel.findByIdAsync(ctrl.accountId)
      .then((data) => {
        return ctrl.res.json(data);
      });
  }
  public static async findById(ctrl: ICtrl): Promise<any> {
    const arg: IArgAccountFindById = ctrl.arg;
    const accountModel = new AccountModel(ctrl.di);
    return accountModel.findByIdAsync(arg.accountId)
      .then((data) => {
        return ctrl.res.json(data);
      });
  }
  public static async login(ctrl: ICtrl): Promise<any> {
    const arg: IArgAccountLogin = ctrl.arg;
    const accountModel = new AccountModel(ctrl.di);
    return accountModel.loginAsync(arg)
      .then((data) => {
        if (arg.cookie === true) {
          const options = {
            httpOnly: true, // The cookie only accessible by the web server?
            maxAge: 1000 * 60 * 60 * 24 * 365, // would expire after 365 days
            signed: true, // Indicates if the cookie should be signed
          };
          ctrl.res.cookie("authorization", data.id, options);
          return ctrl.res.json({});
        } else {
          return ctrl.res.json(data);
        }
      });
  }
  public static async register(ctrl: ICtrl): Promise<any> {
    const arg: IArgAccountRegister = ctrl.arg;
    const accountModel = new AccountModel(ctrl.di);
    return accountModel.createAsync(arg, [Role.USER])
      .then((data) => {
        return ctrl.res.json({});
      });
  }
  public static async logout(ctrl: ICtrl): Promise<any> {
    const accessTokenIds = [];
    const cookieAuthorization = ctrl.req.signedCookies ? ctrl.req.signedCookies.authorization : undefined;
    if (typeof cookieAuthorization === "string") {
      accessTokenIds.push(cookieAuthorization);
    }
    if (typeof ctrl.req.headers.authorization === "string") {
      accessTokenIds.push(ctrl.req.headers.authorization);
    }
    try {
      const accessTokenModel = new AccessTokenModel(ctrl.di);
      await accessTokenModel.deleteIdsAsync(accessTokenIds);
      if (cookieAuthorization) {
        ctrl.res.clearCookie("authorization");
      }
    } catch (err) {
      // tslint:disable-next-line no-console
      console.log(err);
    }
    ctrl.res.json({});
    return Promise.resolve({});
  }
}
