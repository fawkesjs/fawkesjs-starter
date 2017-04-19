import { AccessTokenOrm } from "../module/accessToken/orm";
import { RoleAccountOrm, RoleAclOrm, RoleOrm } from "../module/acl/orm";
import { AccountOrm } from "../orm/account";
export let ormDefinitions = [
  AccountOrm.definition,
  AccessTokenOrm.definition,
  RoleOrm.definition,
  RoleAclOrm.definition,
  RoleAccountOrm.definition,
];
