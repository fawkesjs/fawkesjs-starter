import { Orm, Config } from "fawkesjs"
import * as uuidV4 from 'uuid/v4'
import * as crypto from 'crypto'
export class AccessTokenModel {
  static createAsync(accountId) {
    let sequence = Promise.resolve()
    return sequence.then(() => {
      let token = uuidV4() + crypto.randomBytes(32).toString('hex')
      token = token.replace(/-/g, '').substring(0, 64)
      return Orm.models.AccessToken.create({
        id: token,
        accountId: accountId
      }).then(data => {
        return Promise.resolve(data)
      }).catch(err => {
        return Promise.reject(err)
      })
    })
  }
}
