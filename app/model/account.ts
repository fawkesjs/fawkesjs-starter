import * as bcrypt from "bcrypt-as-promised";
import { Config, Helper } from "fawkesjs";
import * as uuidV4 from "uuid/v4";
import { AccountError, CommonError } from "../error";
import { 
  IArgAccountFindById,
  IArgAccountLogin,
  IArgAccountRegister,
  ICreateResult,
  IDI,
} from "../interface";
import { Orm } from "../lib";
import { AccessTokenModel } from "../model";
import { Role } from "../ref";
export interface IFindByIdAsyncResult {
  createdAt: string;
  email: string;
  id: string;
  name: string;
  updatedAt: string;
}
export class AccountModel {
  private di;
  constructor(di) {
    this.di = di;
  }
  public async findByIdAsync(accountId: string): Promise<IFindByIdAsyncResult> {
    return this.di.orm.models.Account.findOne({
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
  public async loginAsync(arg: IArgAccountLogin): Promise<ICreateResult> {
    try {
      const sequence = Promise.resolve();
      const account = await this.di.orm.models.Account.findOne({
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
      const accessTokenModel = new AccessTokenModel(this.di);
      return accessTokenModel.createAsync(account.id);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  public async createAsync(arg: IArgAccountRegister, roles: string[]): Promise<ICreateResult> {
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
    try {
      const accountData = await this.di.orm.models.Account.create(
        theArg,
        {
          include: [this.di.orm.models.RoleAccount],
        },
      );
      return Promise.resolve({
        id: accountData.id,
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
