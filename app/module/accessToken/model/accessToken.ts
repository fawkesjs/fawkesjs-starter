import * as crypto from "crypto";
import { Config, Orm } from "fawkesjs";
import * as moment from "moment";
import * as uuidV4 from "uuid/v4";
export interface IAccessTokenCreateResult {
  accountId: string;
  expiryDate: string;
  id: string;
}
export interface IDestroyResult {
  affectedCount: number;
}
export class AccessTokenModel {
  public static createAsync(accountId): Promise<IAccessTokenCreateResult> {
    const sequence = Promise.resolve();
    return sequence.then(() => {
      let token = uuidV4() + crypto.randomBytes(32).toString("hex");
      token = token.replace(/-/g, "").substring(0, 64);
      return Orm.models.AccessToken.create({
        accountId,
        expiryDate: moment().add(30, "days").format(),
        id: token,
      }).then((data) => {
        return Promise.resolve({
          accountId: data.accountId,
          expiryDate: data.expiryDate,
          id: data.id,
        });
      }).catch((err) => {
        return Promise.reject(err);
      });
    });
  }
  public static async deleteIdsAsync(accessTokenIds: string[]): Promise<IDestroyResult> {
    if (accessTokenIds.length === 0) {
      return Promise.resolve({
        affectedCount: 0,
      });
    }
    const sequence = Promise.resolve();
    return sequence.then(() => {
      return Orm.models.AccessToken.destroy({
        where: {
          id: {
            $in: accessTokenIds,
          },
        },
      }).then((affectedCount) => {
        return Promise.resolve({
          affectedCount,
        });
      }).catch((err) => {
        return Promise.reject(err);
      });
    });
  }
}
