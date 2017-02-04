import * as Sequelize from "sequelize";

export class RoleAclOrm {
  static definition(sequel: Sequelize.Instance) {
    let RoleAcl = sequel.define("RoleAcl", {
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
        "tableName": "role_acl",
        "timestamps": true,
        "classMethods": {
          associate: function(models) {
            models.Role.hasMany(models.RoleAcl, { foreignKey: 'roleId' })
            models.RoleAcl.belongsTo(models.Role, { foreignKey: 'roleId' })
          }
        }
      });
    return RoleAcl
  }
}
