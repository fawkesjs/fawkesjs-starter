import * as Sequelize from "sequelize";
export interface IArgAccountFindById {
  accountId: string;
}
export interface IArgAccountLogin {
  email: string;
  password: string;
  cookie: boolean;
}
export interface IArgAccountRegister {
  name: string;
  email: string;
  password: string;
}
export interface ICreateResult {
  id: string;
}
export interface IAccessTokenCreateResult {
  accountId: string;
  expiryDate: string;
  id: string;
}

export interface IDI {
  orm: any;
}
