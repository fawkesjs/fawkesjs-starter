import { AccountOrm } from '../orm/account'
import { AccessTokenOrm } from '../module/accessToken/orm'
import { RoleOrm, RoleAclOrm, RoleAccountOrm } from '../module/acl/orm'
export let ormDefinitions = [
  AccountOrm.definition,
  AccessTokenOrm.definition,
  RoleOrm.definition,
  RoleAclOrm.definition,
  RoleAccountOrm.definition
]
