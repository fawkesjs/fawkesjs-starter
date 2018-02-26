import * as Sequelize from "sequelize";

export class AccessTokenOrm {
  public static definition(sequel: Sequelize.Instance) {
    const AccessToken = sequel.define("AccessToken", {
      accountId: {
        allowNull: false,
        field: "account_id",
        type: Sequelize.UUID,
      },
      createdAt: {
        allowNull: false,
        field: "created_at",
        type: Sequelize.DATE,
      },
      expiryDate: {
        field: "expiry_date",
        type: Sequelize.DATE,
      },
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(128),
      },
      updatedAt: {
        field: "updated_at",
        type: Sequelize.DATE,
      },
    },
    {
      tableName: "access_token",
      timestamps: true,
    });
    AccessToken.associate = (models) => {
      models.Account.hasMany(models.AccessToken, { foreignKey: "accountId" });
      models.AccessToken.belongsTo(models.Account, { foreignKey: "accountId" });
    };
    return AccessToken;
  }
}
