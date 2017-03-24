import { Orm, Helper } from "fawkesjs"
import * as uuidV4 from 'uuid/v4'
import * as bcrypt from 'bcrypt-as-promised'
import { IArgAccountFindById, IArgAccountLogin, IArgAccountRegister } from "../interface";
import { AccessTokenModel } from "../model";
import { Role } from "../ref";
import { AccountError } from "../error";
export class AccountModel {
  static async findByIdAsync(accountId: string) {
    let sequence = Promise.resolve()
    return sequence.then(() => {
      return Orm.models.Account.findOne({
        where: {
          id: accountId
        },
        attributes: ['id', 'email', 'name', 'createdAt', 'updatedAt']
      })
    })
  }
  static async loginAsync(arg: IArgAccountLogin) {
    let sequence = Promise.resolve()
    let a = sequence.then(() => {
      return Orm.models.Account.findOne({ where: { email: arg.email } })
    })
    let b = a.then(data => {
      if (!data) {
        return Promise.reject(AccountError.emailPasswordError)
      }
      return bcrypt.compare(arg.password, data.password)
    })
      .catch(err => {
        return Promise.reject(AccountError.emailPasswordError)
      })
    return Promise.all([a, b])
      .then(values => {
        return AccessTokenModel.createAsync(values[0].id)
      })
      .catch(err => {
        return Promise.reject(AccountError.databaseError)
      })
  }
  static async createAsync(arg: IArgAccountRegister, roles: Array<string>) {
    return bcrypt.hash(arg.password, 10)
      .then(hash => {
        let theArg = {
          name: arg.name,
          email: arg.email,
          password: hash,
          id: uuidV4(),
          RoleAccounts: []
        }
        for (let i=0;i<roles.length;i++) {
          theArg.RoleAccounts.push({
            id: uuidV4(),
            roleId: roles[i]
          })
        }
        return Orm.sequelize.transaction().then(t => {
          return Orm.models.Account.create(theArg, { include: [Orm.models.RoleAccount], transaction: t })
            .then(data => {
              return Helper.transactionCommitAsync(t, data)
            })
            .catch(err => {
              return Helper.transactionRollbackAsync(t, err)
            })
        })
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }
}
