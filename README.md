## FawkesJs-starter
FawkesJs starter consist of access token, acl, swagger, db to use with Fawkesjs

## Usage
- git clone this repo
- npm install
- setup database config at `src/database.ts` (tested in postgres)
- npm run db:sync (generate database)
- npm run start
- navigate to localhost:3000/swagger to test the api

## Build in structure in this project
- Express
- Sequelize
- Typescript
- Swagger: use `fawkesjs -s ./swagger/swagger.json` to generate swagger document
- Express Rest Param Validation: integration with swagger document generation
- Acl (inside `fawkesjs-starter/app/module`)
- AccessToken (inside `fawkesjs-starter/app/module`)

## Resources
- [Documentation](https://github.com/fawkesjs/fawkesjs/tree/master/doc)
- [Gitter/Community](https://gitter.im/fawkesjs)
- [Contact Main Author](https://gitter.im/nghenglim)
