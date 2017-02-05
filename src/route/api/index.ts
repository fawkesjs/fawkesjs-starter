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
      "type": "uuid"
    }
  ]
}, {
  remote: '/account/register',
  func: AccountController.register,
  method: 'post',
  parameters: [
    {
      "name": "name",
      "in": "formData",
      "required": true,
      "type": "string",
      "maxLength": 128
    },
    {
      "name": "password",
      "in": "formData",
      "required": true,
      "type": "string",
      "minLength": 6,
      "maxLength": 36
    },
    {
      "name": "email",
      "in": "formData",
      "required": true,
      "type": "email",
      "maxLength": 128
    }
  ]
}, {
  remote: '/account/login',
  func: AccountController.login,
  method: 'post',
  parameters: [
    {
      "name": "age",
      "in": "formData",
      "description": "age, not used, just to showcase parameter checking",
      "type": "integer",
      "maximum": 10,
      "minimum": 100
    },
    {
      "name": "email",
      "in": "formData",
      "description": "Email of account",
      "required": true,
      "type": "email"
    },
    {
      "name": "password",
      "in": "formData",
      "description": "Password of account",
      "required": true,
      "type": "string"
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
