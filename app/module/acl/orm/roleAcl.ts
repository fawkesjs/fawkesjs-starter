import * as Sequelize from "sequelize";

export class RoleAclOrm {
  public static definition(sequel: Sequelize.Instance) {
    const RoleAcl = sequel.define("RoleAcl", {
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
      "roleId": {
        "allowNull": false,
        "field": "role_id",
        "type": Sequelize.UUID,
        "validate": {
          "isUUID": 4,
        },
      },
      "updatedAt": {
        "field": "updated_at",
        "type": Sequelize.DATE,
      },
    },
      {
        "classMethods": {
          associate: (models) => {
            models.Role.hasMany(models.RoleAcl, { foreignKey: "roleId" });
            models.RoleAcl.belongsTo(models.Role, { foreignKey: "roleId" });
          },
        },
        "tableName": "role_acl",
        "timestamps": true,
      });
    return RoleAcl;
  }
}
