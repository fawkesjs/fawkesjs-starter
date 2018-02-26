import { AccessTokenOrm } from "../module/accessToken/orm";
import { RoleAccountOrm, RoleOrm } from "../module/acl/orm";
import { AccountOrm } from "../orm/account";
export let ormDefinitions = [
  AccountOrm.definition,
  AccessTokenOrm.definition,
  RoleOrm.definition,
  RoleAccountOrm.definition,
];
