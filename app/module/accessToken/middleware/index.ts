import { Orm, IPreCtrl } from 'fawkesjs'
export class AccessTokenMiddleware {
  static verifyAsync(preCtrl: IPreCtrl) {
    let sequence = Promise.resolve()
    let authorization = preCtrl.req.headers.authorization
    if (typeof authorization === 'string') {
      sequence = sequence.then(() => {
        return Orm.models.AccessToken.findOne({
          where: {
            id: authorization
          },
          attributes: ['accountId']
        })
          .then((data) => {
            if (data) {
              preCtrl.accountId = data.accountId
            }
            return Promise.resolve()
          })
      })
    }

    return sequence.then(() => {
      return preCtrl
    })
  }
}
