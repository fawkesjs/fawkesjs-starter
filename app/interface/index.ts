import * as Sequelize from "sequelize";
export interface IArgAccountFindById {
  accountId: string
}
export interface IArgAccountLogin {
  email: string,
  password: string
}
export interface IArgAccountRegister {
  name: string,
  email: string,
  password: string
}

export interface AccountAttribute {
  id: string;
  name: string;
  email: string;
  password?: string;
}

export interface AccountOrmInstance extends Sequelize.Instance<AccountAttribute>, AccountAttribute {
  getAddresses: Sequelize.HasManyGetAssociationsMixin<AddressAttribute>;
  setAddresses: Sequelize.HasManySetAssociationsMixin<AddressAttribute, string>;
  addAddresses: Sequelize.HasManyAddAssociationsMixin<AddressAttribute, string>;
  addAddress: Sequelize.HasManyAddAssociationMixin<AddressAttribute, string>;
  createAddress: Sequelize.HasManyCreateAssociationMixin<AddressAttribute>;
  removeAddress: Sequelize.HasManyRemoveAssociationMixin<AddressAttribute, string>;
  removeAddresses: Sequelize.HasManyRemoveAssociationsMixin<AddressAttribute, string>;
  hasAddress: Sequelize.HasManyHasAssociationMixin<AddressAttribute, string>;
  hasAddresses: Sequelize.HasManyHasAssociationsMixin<AddressAttribute, string>;
  countAddresses: Sequelize.HasManyCountAssociationsMixin;
}

export interface AccountOrm extends Sequelize.Model<AccountOrmInstance, AccountAttribute> {
  belongsTo: any;
  hasMany: any;
  create: any;
  find: any;
}

export interface AddressAttribute {
  id?: string;
  street?: string;
  city?: string;
  state?: string,
  zip?: string;
}

export interface AddressOrmInstance extends Sequelize.Instance<AddressAttribute>, AddressAttribute {
  getAccount: Sequelize.BelongsToGetAssociationMixin<AccountInstance>;
  setAccount: Sequelize.BelongsToSetAssociationMixin<AccountInstance, string>;
  createAccount: Sequelize.BelongsToCreateAssociationMixin<AccountInstance>;
}

export interface AddressOrm extends Sequelize.Model<AddressOrmInstance, AddressAttribute> {
  belongsTo: any;
  hasMany: any;
  create: any;
  find: any;
}
