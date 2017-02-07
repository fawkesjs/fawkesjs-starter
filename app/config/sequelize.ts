import { Config } from 'fawkesjs'
let env = process.env.NODE_ENV || "development"
let seq = {}
seq[env] = Config.datasource.db
module.exports = seq
