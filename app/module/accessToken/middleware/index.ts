import { IPreCtrl, Orm } from "fawkesjs";
import * as moment from "moment";

export class AccessTokenMiddleware {
  public static verifyAsync(preCtrl: IPreCtrl) {
    let sequence = Promise.resolve();
    const cookieAuthorization = preCtrl.req.signedCookies ? preCtrl.req.signedCookies.authorization : undefined;
    const authorization = preCtrl.req.headers.authorization || cookieAuthorization;
    // tslint:disable-next-line:no-console
    console.log(cookieAuthorization);
    if (typeof authorization === "string") {
      sequence = sequence.then(() => {
        return Orm.models.AccessToken.findOne({
          attributes: ["accountId"],
          where: {
            expiryDate: {
              $gte: moment().format(),
            },
            id: authorization,
          },
        })
          .then((data) => {
            if (data) {
              preCtrl.accountId = data.accountId;
            }
            return Promise.resolve();
          });
      });
    }

    return sequence.then(() => {
      return preCtrl;
    });
  }
}
