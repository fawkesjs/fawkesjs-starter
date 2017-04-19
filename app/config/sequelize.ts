import { Config, Helper } from "fawkesjs";
import * as path from "path";
import * as _ from "underscore";
declare const System: any;
const env = process.env.NODE_ENV || "development";
const conf = {db: null};
for (const o of Helper.globFiles(Config.outDir + Config.configDir + "/datasource" + Config.extension)) {
  const tmp = System.import(path.resolve(o));
  _.extend(conf, tmp);
}
for (const o of Helper.globFiles(Config.outDir + Config.configDir + "/datasource." + env + Config.extension)) {
  const tmp = System.import(path.resolve(o));
  _.extend(conf, tmp);
}
const seq = {};
seq[env] = conf.db;
module.exports = seq;
