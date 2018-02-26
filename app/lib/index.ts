import {Config, Helper} from "fawkesjs";
import * as path from "path";
import * as Sequelize from "sequelize";
export class Template {
  public static MAIN = "template/main";
  public static GUEST = "template/guest";
  public static page(page) {
    return {
      page: "../view/" + page,
      title: "FawkesJs Starter",
    };
  }
}
export class Orm {
  private static singleton: Orm;
  public sequelize: any = null;
  public models: any = {};

  constructor(config: Config, option?: {singleton: boolean}) {
    if (Helper.objGet(option, "singleton", false)) {
      if (typeof Orm.singleton !== "undefined") {
        return Orm.singleton;
      }
    }
    const dbConfig = config.datasource.db;
    const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
    for (const o of Helper.globFiles(config.outDir + "/orm" + "/index" + config.extension)) {
      const m = require(path.resolve(o));
      for (const ii of m.ormDefinitions) {
        const model = ii(sequelize);
        this.models[model.name] = model;
      }
    }
    Object.keys(this.models).forEach((modelName) => {
      if ("associate" in this.models[modelName]) {
        this.models[modelName].associate(this.models);
      }
    });
    this.sequelize = sequelize;

    if (Helper.objGet(option, "singleton", false)) {
      Orm.singleton = this;
    }
    return this;
  }
}
