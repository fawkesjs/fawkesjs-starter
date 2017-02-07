import { IndexController, AccountController } from "../../controller";
import { IRoutes } from "fawkesjs";
import { Role } from "../../ref";
export const routes: IRoutes = [{
  remote: '/',
  func: IndexController.api,
  acl: {
    target: 'guest'
  },
  method: 'get'
}, {
  remote: '/account/me',
  func: AccountController.findMe,
  acl: {
    target: 'authenticated',
    role: [Role.ADMIN, Role.USER]
  },
  method: 'get'
}, {
  remote: '/account/{accountId}',
  func: AccountController.findById,
  acl: {
    target: 'authenticated',
    role: [Role.ADMIN]
  },
  method: 'get',
  parameters: [
    {
      "name": "accountId",
      "in": "path",
      "description": "ID of account",
      "required": true,
      "type": "string",
      "format": "uuid"
    }
  ]
}, {
  remote: '/account/register',
  func: AccountController.register,
  method: 'post',
  parameters: [
    {
      "name": "body",
      "in": "body",
      "required": true,
      "type": 'object',
      "schema": {
        "title": "AccountLogin",
        "required":[
            "email",
            "password",
            "name",
            "type"
        ],
        "properties":{
          "email":{
            "type":"string",
            "format": "email",
            "maxLength": 128
          },
          "password":{
            "type":"string",
            "minLength": 6,
            "maxLength": 36
          },
          "name": {
            "type": "string",
            "maxLength": 128
          },
          "type": {
            "description": "showcase, perhaps female or male type",
            "type": "integer",
            "minimum": 1,
            "maximum": 2,
            "default": 1
          },
          "subscribe": {
            "description": "showcase",
            "type": "boolean",
            "default": false
          },
          "address": {
            "type": "array",
            "items": {
              "title": "AccountAddress",
              "required": [
                "address1",
                "postcode"
              ],
              "properties": {
                "address1": {
                  "type": "string",
                  "maxLength": 128
                },
                "address2": {
                  "type": "string",
                  "maxLength": 128
                },
                "postcode": {
                  "type": "string",
                  "maxLength": 128
                }
              }
            }
          }
        }
      }
    }
  ]
}, {
  remote: '/account/login',
  func: AccountController.login,
  method: 'post',
  parameters: [
    {
      "name": "password",
      "in": "formData",
      "required": true,
      "description": "should use body, using formData is for showcase",
      "type": "string",
      "minLength": 6,
      "maxLength": 36
    },
    {
      "name": "email",
      "in": "formData",
      "required": true,
      "type": "string",
      "format": "email",
      "maxLength": 128
    }
  ]
}]
export const swagger = {
  "responses": {
    "200": {
      "description": "success return",
      "schema": {
        "type": "object"
      }
    }
  }
}