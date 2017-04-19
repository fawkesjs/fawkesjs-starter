import * as crypto from "crypto";
import { Config, Orm } from "fawkesjs";
import * as uuidV4 from "uuid/v4";
export class AccessTokenModel {
  public static createAsync(accountId) {
    const sequence = Promise.resolve();
    return sequence.then(() => {
      let token = uuidV4() + crypto.randomBytes(32).toString("hex");
      token = token.replace(/-/g, "").substring(0, 64);
      return Orm.models.AccessToken.create({
        id: token,
        accountId,
      }).then((data) => {
        return Promise.resolve(data);
      }).catch((err) => {
        return Promise.reject(err);
      });
    });
  }
  public static async deleteIdsAsync(accessTokenIds: string[]) {
    if (accessTokenIds.length === 0) {
      return Promise.resolve({});
    }
    const sequence = Promise.resolve();
    return sequence.then(() => {
      return Orm.models.AccessToken.destroy({
        where: {
          id: {
            $in: accessTokenIds,
          },
        },
      }).then((data) => {
        return Promise.resolve(data);
      }).catch((err) => {
        return Promise.reject(err);
      });
    });
  }
}
