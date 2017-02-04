import * as Sequelize from "sequelize";

export class AccessTokenOrm {
  static definition(sequel: Sequelize.Instance) {
    let AccessToken = sequel.define("AccessToken", {
      "id": {
        "type": Sequelize.STRING(128),
        "allowNull": false,
        "primaryKey": true
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
        "tableName": "access_token",
        "timestamps": true,
        "classMethods": {
          associate: function(models) {
            models.Account.hasMany(models.AccessToken, { foreignKey: 'accountId' })
            models.AccessToken.belongsTo(models.Account, { foreignKey: 'accountId' })
          }
        }
      });
    return AccessToken
  }
}
