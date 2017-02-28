import { Orm, Fawkes } from "fawkesjs"
import { Role } from "../ref"
import { AccountModel } from "../model"
const roles = [{ id: Role.ADMIN, name: 'admin' }, { id: Role.USER, name: 'user' }]
Fawkes.initClass()
Orm.models.Account.sync({ force: true })
  .then(data => {
    return Orm.models.AccessToken.sync({ force: true })
  })
  .then(data => {
    return Orm.models.Role.sync({ force: true })
  })
  .then(data => {
    return Orm.models.RoleAcl.sync({ force: true })
  })
  .then(data => {
    return Orm.models.RoleAccount.sync({ force: true })
  })
  .then(data => {
    return Orm.models.AccessToken.sync({ force: true })
  })
  .then(data => {
    return dataInitialize()
  })
  .catch(err => {
    throw err
  })

  async function dataInitialize() {
    try {
      for (let i = 0; i < roles.length; i++) {
        let role = roles[i]
        let p = await Orm.models.Role.create(
          { id: role.id, name: role.name }
        )
      }
      let adminAccount = AccountModel.createAsync({
          name: "admin",
          email: "admin@localhost.com",
          password: "admin"
        }, Role.ADMIN)
      return Promise.resolve({})
    } catch(err) {
      return Promise.reject(err)
    }
  }
