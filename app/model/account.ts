import * as bcrypt from "bcrypt-as-promised";
import { Helper, Orm } from "fawkesjs";
import * as uuidV4 from "uuid/v4";
import { AccountError } from "../error";
import { IArgAccountFindById, IArgAccountLogin, IArgAccountRegister } from "../interface";
import { AccessTokenModel } from "../model";
import { Role } from "../ref";

export class AccountModel {
  public static async findByIdAsync(accountId: string) {
    const sequence = Promise.resolve();
    return sequence.then(() => {
      return Orm.models.Account.findOne({
        attributes: ["id", "email", "name", "createdAt", "updatedAt"],
        where: {
          id: accountId,
        },
      });
    });
  }
  public static async loginAsync(arg: IArgAccountLogin) {
    const sequence = Promise.resolve();
    const a = sequence.then(() => {
      return Orm.models.Account.findOne({ where: { email: arg.email } });
    });
    const b = a.then((data) => {
        if (!data) {
          return Promise.reject(AccountError.emailPasswordError);
        }
        return bcrypt.compare(arg.password, data.password);
      })
      .catch((err) => {
        return Promise.reject(AccountError.emailPasswordError);
      });
    return Promise.all([a, b])
      .then((values) => {
        return AccessTokenModel.createAsync(values[0].id);
      })
      .catch((err) => {
        return Promise.reject(AccountError.databaseError);
      });
  }
  public static async createAsync(arg: IArgAccountRegister, roles: string[]) {
    return bcrypt.hash(arg.password, 10)
      .then((hash) => {
        const theArg = {
          RoleAccounts: [],
          email: arg.email,
          name: arg.name,
          password: hash,
        };
        for (const role of roles) {
          theArg.RoleAccounts.push({
            roleId: role,
          });
        }
        return Orm.sequelize.transaction().then((t) => {
          return Orm.models.Account.create(theArg, { include: [Orm.models.RoleAccount], transaction: t })
            .then((data) => {
              return Helper.transactionCommitAsync(t, data);
            })
            .catch((err) => {
              return Helper.transactionRollbackAsync(t, err);
            });
        });
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }
}
