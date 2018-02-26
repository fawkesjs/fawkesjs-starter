import * as Sequelize from "sequelize";
import * as uuidV4 from "uuid/v4";

export class AccountOrm {
  public static definition(sequel: Sequelize.Instance) {
    const Account = sequel.define("Account", {
      createdAt: {
        allowNull: false,
        field: "created_at",
        type: Sequelize.DATE,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(128),
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      id: {
        allowNull: false,
        defaultValue: () => {
          return uuidV4(); // WARNING: use build in function from database instead for production
        },
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(128),
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(128),
      },
      updatedAt: {
        field: "updated_at",
        type: Sequelize.DATE,
      },
    },
      {
        tableName: "account",
        timestamps: true,
      });
    return Account;
  }
}
