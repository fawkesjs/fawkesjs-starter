import { Config, Helper } from "fawkesjs";
import * as path from "path";
import * as _ from "underscore";
declare const System: any;
const env = process.env.NODE_ENV || "development";
const conf = {db: null};
const config = new Config();
for (const o of Helper.globFiles(config.outDir + config.configDir + "/datasource" + config.extension)) {
  const tmp = System.import(path.resolve(o));
  _.extend(conf, tmp);
}
for (const o of Helper.globFiles(config.outDir + config.configDir + "/datasource." + env + config.extension)) {
  const tmp = System.import(path.resolve(o));
  _.extend(conf, tmp);
}
const seq = {};
seq[env] = conf.db;
module.exports = seq;
