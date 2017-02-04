import * as Sequelize from "sequelize";

export class RoleAccountOrm {
  static definition(sequel: Sequelize.Instance) {
    let RoleAccount = sequel.define("RoleAccount", {
      "id": {
        "type": Sequelize.UUID,
        "allowNull": false,
        "primaryKey": true
      },
      "roleId": {
        "type": Sequelize.UUID,
        "allowNull": false,
        "field": "role_id"
      },
      "accountId": {
        "type": Sequelize.UUID,
        "allowNull": false,
        "field": "account_id"
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
        "tableName": "role_account",
        "timestamps": true,
        "classMethods": {
          associate: function(models) {
            models.Role.hasMany(models.RoleAccount, { foreignKey: 'roleId' })
            models.RoleAccount.belongsTo(models.Role, { foreignKey: 'roleId' })
            models.Account.hasMany(models.RoleAccount, { foreignKey: 'accountId' })
            models.RoleAccount.belongsTo(models.Account, { foreignKey: 'accountId' })
          }
        }
      });
    return RoleAccount
  }
}
