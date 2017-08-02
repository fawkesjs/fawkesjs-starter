import { Config, Fawkes, Orm } from "fawkesjs";
import { AccountModel } from "../model";
import { Role } from "../ref";

const roles = [{ id: Role.ADMIN, name: "admin" }, { id: Role.USER, name: "user" }];
const orm = new Orm(new Config());
modelSyncAsync()
  .then((data) => {
    return dataInitialize();
  })
  .catch((err) => {
    throw err;
  });

async function modelSyncAsync() {
  for (const key in orm.models) {
    if (orm.models.hasOwnProperty(key)) {
      await orm.models[key].sync({ force: true });
    }
  }
  return Promise.resolve({});
}

async function dataInitialize() {
  try {
    for (const role of roles) {
      await orm.models.Role.create(
        { id: role.id, name: role.name },
      );
    }
    const adminAccount = await AccountModel.createAsync({
        email: "admin@localhost.com",
        name: "admin",
        password: "admin",
      }, [Role.ADMIN, Role.USER]);
    return Promise.resolve({});
  } catch (err) {
    return Promise.reject(err);
  }
}
