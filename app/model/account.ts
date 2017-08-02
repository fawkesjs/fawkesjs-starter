import * as bcrypt from "bcrypt-as-promised";
import { Config, Helper, Orm } from "fawkesjs";
import * as uuidV4 from "uuid/v4";
import { AccountError, CommonError } from "../error";
import { IArgAccountFindById, IArgAccountLogin, IArgAccountRegister, ICreateResult } from "../interface";
import { AccessTokenModel } from "../model";
import { Role } from "../ref";
export interface IFindByIdAsyncResult {
  createdAt: string;
  email: string;
  id: string;
  name: string;
  updatedAt: string;
}
const orm = new Orm(new Config({singleton: true}), {singleton: true});
export class AccountModel {
  public static async findByIdAsync(accountId: string): Promise<IFindByIdAsyncResult> {
    return orm.models.Account.findOne({
      attributes: ["id", "email", "name", "createdAt", "updatedAt"],
      where: {
        id: accountId,
      },
    }).then((data) => {
      if (data) {
        return Promise.resolve({
          createdAt: data.createdAt,
          email: data.email,
          id: data.id,
          name: data.name,
          updatedAt: data.updatedAt,
        });
      } else {
        return Promise.reject(CommonError.resultEmptyError);
      }
    });
  }
  public static async loginAsync(arg: IArgAccountLogin): Promise<ICreateResult> {
    try {
      const sequence = Promise.resolve();
      const account = await orm.models.Account.findOne({
        attributes: ["id", "password"],
        where: { email: arg.email },
      });
      if (!account) {
        return Promise.reject(AccountError.emailPasswordError);
      }
      const bcryptCompare = await bcrypt.compare(arg.password, account.password)
        .catch((err) => {
          return false;
        });
      if (bcryptCompare === false) {
        return Promise.reject(AccountError.emailPasswordError);
      }
      return AccessTokenModel.createAsync(account.id);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  public static async createAsync(arg: IArgAccountRegister, roles: string[]): Promise<ICreateResult> {
    const hash = await bcrypt.hash(arg.password, 10);
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

    const t = await orm.sequelize.transaction();
    try {
      const accountData = await orm.models.Account.create(
        theArg,
        {
          include: [orm.models.RoleAccount],
          transaction: t,
        },
      );
      await t.commit();
      return Promise.resolve({
        id: accountData.id,
      });
    } catch (err) {
      await t.rollback();
      return Promise.reject(err);
    }
  }
}
