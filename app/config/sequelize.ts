import { Config, Helper } from 'fawkesjs'
import * as path from "path";
import * as _ from "underscore";
let env = process.env.NODE_ENV || "development"
let conf = {db: null}
for (let o of Helper.globFiles(Config.outDir + Config.configDir + '/datasource' + Config.extension)) {
  let tmp = require(path.resolve(o))
  _.extend(conf, tmp)
}
for (let o of Helper.globFiles(Config.outDir + Config.configDir + '/datasource.' + env + Config.extension)) {
  let tmp = require(path.resolve(o))
  _.extend(conf, tmp)
}
let seq = {}
seq[env] = conf.db
module.exports = seq
