import * as Sequelize from "sequelize";
import * as uuidV4 from "uuid/v4";

export class RoleOrm {
  public static definition(sequel: Sequelize.Instance) {
    const Role = sequel.define("Role", {
      createdAt: {
        allowNull: false,
        field: "created_at",
        type: Sequelize.DATE,
      },
      id: {
        allowNull: false,
        defaultValue: function() {
          return uuidV4(); // WARNING: use build in function from database instead for production
        },
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(128),
      },
      updatedAt: {
        field: "updated_at",
        type: Sequelize.DATE,
      },
    },
      {
        tableName: "role",
        timestamps: true,
      });
    return Role;
  }
}
