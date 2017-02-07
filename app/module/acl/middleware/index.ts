import { Orm, IPreCtrl, IError, ErrorCode } from 'fawkesjs'
let authError: IError = {
  statusCode: 401,
  errorCode: ErrorCode.ACL_ERROR
}
export class AclMiddleware {
  static verifyAsync(preCtrl: IPreCtrl) {
    let sequence = Promise.resolve()
    let acl = preCtrl.route.acl
    if (acl && acl.target) {
      sequence = sequence.then(() => {
        if (acl.target === 'guest' && typeof preCtrl.accountId !== 'undefined') {
          return Promise.reject(authError)
        } else if (acl.target === 'authenticated' && typeof preCtrl.accountId === 'undefined') {
          return Promise.reject(authError)
        }
        return Promise.resolve()
      })
    }
    // this can change to redis or memcached for better performance
    if (acl && acl.role && acl.role.length) {
      sequence = sequence.then(() => {
        if (typeof preCtrl.accountId === 'undefined') {
          return Promise.reject(authError)
        }
        return Orm.models.RoleAccount.findOne({
          where: {
            roleId: {
              $in: acl.role
            },
            accountId: preCtrl.accountId
          },
          attributes: ['id']
        })
          .then((data) => {
            if (!data) {
              return Promise.reject(authError)
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
