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
    Orm.sequelize.transaction(t => {
      let ps = []
      for (let i = 0; i < roles.length; i++) {
        let role = roles[i]
        let p = Orm.models.Role.create(
          { id: role.id, name: role.name }
        )
        ps.push()
      }
      return Promise.all(ps)
    })
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
    return AccountModel.createAsync({
      name: "admin",
      email: "admin@localhost.com",
      password: "admin"
    }, Role.ADMIN)
  })
  .then(data => {
    return Promise.resolve(data)
  })
  .catch(err => {
    console.log(err)
  })
