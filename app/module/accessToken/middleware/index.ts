import { Config, Helper, IPreCtrl, Orm } from "fawkesjs";
import * as moment from "moment";
const orm = new Orm(new Config({singleton: true}), {singleton: true});
export class AccessTokenMiddleware {
  public static verifyAsync(preCtrl: IPreCtrl) {
    let sequence = Promise.resolve();
    const cookieAuthorization = preCtrl.req.signedCookies ? preCtrl.req.signedCookies.authorization : undefined;
    const authorizationHeader = Helper.objGet(preCtrl.req.headers, "authorization", "");
    const authorizationHeaders = authorizationHeader.split(" ");
    let authorizationToken = "";
    if (authorizationHeaders.length === 2 && authorizationHeaders[0] === "Bearer") {
      authorizationToken = authorizationHeaders[1];
    }
    const authorization = authorizationToken || cookieAuthorization;

    if (authorization && typeof authorization === "string") {
      sequence = sequence.then(() => {
        return orm.models.AccessToken.findOne({
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
