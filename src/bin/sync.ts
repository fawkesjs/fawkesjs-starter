import { Orm } from "fawkesjs"
import { Role } from "../ref"
const roles = [{ id: Role.ADMIN, name: 'admin' }, { id: Role.USER, name: 'user' }]
Orm.models.Account.sync()
  .then(data => {
    return Orm.models.AccessToken.sync({ force: true })
  })
  .then(data => {
    return Orm.models.Role.sync({ force: true })
  })
  .then(data => {
    let ps = []
    for (let i = 0; i < roles.length; i++) {
      let role = roles[i]
      let p = Orm.models.Role.findOrCreate(
        {
          where: { id: role.id },
          defaults: { id: role.id, name: role.name }
        }
      )
      ps.push()
    }
    return Promise.all(ps)
  })
  .then(data => {
    return Orm.models.RoleAcl.sync({ force: true })
  })
  .then(data => {
    return Orm.models.RoleAccount.sync({ force: true })
  })
  .then(data => {
    return Promise.resolve(data)
  })
  .catch(err => {
    console.log(err)
  })
