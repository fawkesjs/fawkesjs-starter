## FawkesJs-starter
FawkesJs starter consist of access token, acl, swagger, db to use with Fawkesjs

## Usage
- git clone this repo
- npm install
- setup database config at `src/database.ts` (tested in postgres)
- npm run db:sync (generate database)
- npm run start
- navigate to localhost:3000/swagger to test the api

## Main Structure
- src/bin: this is place to store script
- src/config/config: this is place for main config
- src/config/datasource: this is place for database config
- src/config/controller: this is place for controller (which should not have business logic)
- src/model: this is where your model should be at
- src/module: plugin module, possibly change to node_modules
- src/orm: list of orm that you want to include
- src/route: list of route, only accept folder name + index.ts, route/index.ts is the base url.
- migrations: sequelize migration file
- public: your html file, can also be jade file, whatever engine you want

## Naming Convention
- all folder singular form, to avoid headache in naming (if I use plural form, should src/bin be src/bins ?)

## Community
- FawkesJs https://gitter.im/fawkesjs
- Anything personal go to https://gitter.im/nghenglim
