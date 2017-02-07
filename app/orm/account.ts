import { AccountAttribute, AccountOrmInstance } from "../interface"
import * as Sequelize from "sequelize";

export class AccountOrm {
  static definition(sequel: Sequelize.Instance) {
    let Account = sequel.define<AccountOrmInstance, AccountAttribute>("Account", {
      "id": {
        "type": Sequelize.UUID,
        "allowNull": false,
        "primaryKey": true
      },
      "name": {
        "type": Sequelize.STRING(128),
        "allowNull": false
      },
      "email": {
        "type": Sequelize.STRING(128),
        "allowNull": false,
        "unique": true,
        "validate": {
          "isEmail": true
        }
      },
      "password": {
        "type": Sequelize.STRING(128),
        "allowNull": false
      },
      "createdAt": {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at'
      },
      "updatedAt": {
        type: Sequelize.DATE,
        field: 'updated_at'
      }
    },
      {
        "tableName": "account",
        "timestamps": true
      });
    return Account
  }
}
