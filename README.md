# NOTICE
This project is no longer under development, a combination of [Koa](http://koajs.com/) with [GraphQL](https://graphql.org/) can achieve a similar functionality.

## FawkesJs-starter
> FawkesJs starter consist of access token, acl, swagger, db to use with Fawkesjs.
> Can be used to setup web front end + API.

[![Chat on Gitter](https://badges.gitter.im/fawkesjs/fawkesjs.svg)](https://gitter.im/fawkesjs/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Usage
```bash
git clone https://github.com/fawkesjs/fawkesjs-starter
cd fawkesjs-starter
npm install
npm run start # use npm run dev to not rebuilding the database
```

open another console and run following command to have auto restart
```
npm run watch
```

### Common Command
- Generating Swagger: `npm run swagger`
- Full Migrate DB: `npm run db:sync`
- Restart App: `node .` or `nodemon ./index.js -e ts --watch app`

## TODO
- Add default use knexjs for query and sequelize for orm

## Testing
- You can directly call Api with Postman/etc, the server will do data validation according to swagger configuration
- ErrorCode in error return: REST_PARAM_ERROR = 601, ACL_ERROR = 602, REST_PARAM_NOT_SUPPORTED = 604, EMAIL_LOGIN_ERROR = 10001, DB_ERROR = 10002

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
