## FawkesJs-starter
FawkesJs starter consist of access token, acl, swagger, db to use with Fawkesjs

## Usage
- git clone https://github.com/fawkesjs/fawkesjs-starter
- npm install && npm run start
- navigate to localhost:3000/swagger to test the api
- Config is at app/config, see [Documentation](https://github.com/fawkesjs/fawkesjs/tree/master/doc) for more info

## Testing Api
- default with admin account "admin@localhost.com" password "admin"
- login with /api/account/login will return access_token in object id
- the access_token can be set above swagger Authorize button
- You can directly call Api with Postman/etc, the server will do data validation according to swagger configuration
- GET /api/account/{accountId} can only access by ADMIN role, GET /api/account/me can only access after login
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
- [Gitter/Community](https://gitter.im/fawkesjs)
- [Contact Main Author](https://gitter.im/nghenglim)
