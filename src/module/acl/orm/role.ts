import * as Sequelize from "sequelize";

export class RoleOrm {
  static definition(sequel: Sequelize.Instance) {
    let Role = sequel.define("Role", {
      "id": {
        "type": Sequelize.UUID,
        "allowNull": false,
        "primaryKey": true
      },
      "name": {
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
        "tableName": "role",
        "timestamps": true
      });
    return Role
  }
}
