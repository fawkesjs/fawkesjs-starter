import * as Sequelize from "sequelize";

export class RoleOrm {
  public static definition(sequel: Sequelize.Instance) {
    const Role = sequel.define("Role", {
      "createdAt": {
        "allowNull": false,
        "field": "created_at",
        "type": Sequelize.DATE,
      },
      "id": {
        "allowNull": false,
        "defaultValue": Sequelize.UUIDV4,
        "primaryKey": true,
        "type": Sequelize.UUID,
        "validate": {
          "isUUID": 4,
        },
      },
      "name": {
        "allowNull": false,
        "type": Sequelize.STRING(128),
      },
      "updatedAt": {
        "field": "updated_at",
        "type": Sequelize.DATE,
      },
    },
      {
        "tableName": "role",
        "timestamps": true,
      });
    return Role;
  }
}
