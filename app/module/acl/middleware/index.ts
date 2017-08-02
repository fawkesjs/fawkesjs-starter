import { Config, ErrorCode, IError, IPreCtrl, Orm } from "fawkesjs";
const authError: IError = {
  errorCode: ErrorCode.ACL_ERROR,
  statusCode: 401,
};
const orm = new Orm(new Config({singleton: true}), {singleton: true});
export class AclMiddleware {
  public static verifyAsync(preCtrl: IPreCtrl) {
    let sequence = Promise.resolve();
    const acl = preCtrl.route.acl;
    if (acl && acl.target) {
      sequence = sequence.then(() => {
        if (acl.target === "guest" && typeof preCtrl.accountId !== "undefined") {
          return Promise.reject(authError);
        } else if (acl.target === "authenticated" && typeof preCtrl.accountId === "undefined") {
          return Promise.reject(authError);
        }
        return Promise.resolve();
      });
    }
    // this can change to redis or memcached for better performance
    if (acl && acl.role && acl.role.length) {
      sequence = sequence.then(() => {
        if (typeof preCtrl.accountId === "undefined") {
          return Promise.reject(authError);
        }
        return orm.models.RoleAccount.findOne({
          attributes: ["id"],
          where: {
            accountId: preCtrl.accountId,
            roleId: {
              $in: acl.role,
            },
          },
        })
          .then((data) => {
            if (!data) {
              return Promise.reject(authError);
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
