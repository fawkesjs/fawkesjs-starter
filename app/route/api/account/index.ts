import { IRoute } from "fawkesjs";
import { AccountController } from "../../../controller";
import { Role } from "../../../ref";
export const routes: IRoute[] = [{
  acl: {
    role: [Role.USER],
    target: "authenticated",
  },
  func: AccountController.findMe,
  method: "get",
  remote: "/me",
}, {
  acl: {
    role: [Role.ADMIN],
    target: "authenticated",
  },
  func: AccountController.findById,
  method: "get",
  parameters: [
    {
      "description": "ID of account",
      "format": "uuid",
      "in": "path",
      "name": "accountId",
      "required": true,
      "type": "string",
    },
  ],
  remote: "/findById/{accountId}",
}, {
  func: AccountController.register,
  method: "post",
  parameters: [
    {
      "in": "body",
      "name": "body",
      "required": true,
      "schema": {
        "properties": {
          "address": {
            "items": {
              "properties": {
                "address1": {
                  "maxLength": 128,
                  "type": "string",
                },
                "address2": {
                  "maxLength": 128,
                  "type": "string",
                },
                "postcode": {
                  "maxLength": 128,
                  "type": "string",
                },
              },
              "required": [
                "address1",
                "postcode",
              ],
              "title": "AccountAddress",
            },
            "type": "array",
          },
          "email": {
            "format": "email",
            "maxLength": 128,
            "type": "string",
          },
          "name": {
            "maxLength": 128,
            "type": "string",
          },
          "password": {
            "maxLength": 36,
            "minLength": 6,
            "type": "string",
          },
          "subscribe": {
            "default": false,
            "description": "showcase",
            "type": "boolean",
          },
          "type": {
            "description": "showcase, perhaps female or male type",
            "enum": [1, 2],
            "maximum": 2,
            "minimum": 1,
            "type": "integer",
          },
        },
        "required": [
            "email",
            "password",
            "name",
            "type",
        ],
        "title": "AccountRegister",
        "type": "object",
      },
    },
  ],
  remote: "/register",
}, {
  func: AccountController.login,
  method: "post",
  parameters: [
    {
      "description": "should use body, using formData is for showcase",
      "format": "email",
      "in": "formData",
      "maxLength": 128,
      "name": "email",
      "required": true,
      "type": "string",
    },
    {
      "in": "formData",
      "maxLength": 36,
      "minLength": 3,
      "name": "password",
      "required": true,
      "type": "string",
    },
    {
      "default": false,
      "in": "formData",
      "name": "cookie",
      "required": true,
      "type": "boolean",
    },
  ],
  remote: "/login",
}, {
  func: AccountController.logout,
  method: "post",
  parameters: [],
  remote: "/logout",
}];
