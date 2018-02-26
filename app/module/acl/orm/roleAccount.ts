import * as Sequelize from "sequelize";
import * as uuidV4 from "uuid/v4";

export class RoleAccountOrm {
  public static definition(sequel: Sequelize.Instance) {
    const RoleAccount = sequel.define("RoleAccount", {
      accountId: {
        allowNull: false,
        field: "account_id",
        type: Sequelize.UUID,
        validate: {
          isUUID: 4,
        },
      },
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
      roleId: {
        allowNull: false,
        field: "role_id",
        type: Sequelize.UUID,
        validate: {
          isUUID: 4,
        },
      },
      updatedAt: {
        field: "updated_at",
        type: Sequelize.DATE,
      },
    },
      {
        classMethods: {
          associate: (models) => {
            models.Role.hasMany(models.RoleAccount, { foreignKey: "roleId" });
            models.RoleAccount.belongsTo(models.Role, { foreignKey: "roleId" });
            models.Account.hasMany(models.RoleAccount, { foreignKey: "accountId" });
            models.RoleAccount.belongsTo(models.Account, { foreignKey: "accountId" });
          },
        },
        tableName: "role_account",
        timestamps: true,
      });
    RoleAccount.associate = (models) => {
      models.Role.hasMany(models.RoleAccount, { foreignKey: "roleId" });
      models.RoleAccount.belongsTo(models.Role, { foreignKey: "roleId" });
      models.Account.hasMany(models.RoleAccount, { foreignKey: "accountId" });
      models.RoleAccount.belongsTo(models.Account, { foreignKey: "accountId" });
    };
    return RoleAccount;
  }
}
