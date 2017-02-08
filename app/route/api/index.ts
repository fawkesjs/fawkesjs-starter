import { IndexController } from "../../controller";
import { IRoutes } from "fawkesjs";
export const routes: IRoutes = [{
  remote: '/',
  func: IndexController.api,
  acl: {
    target: 'guest'
  },
  method: 'get'
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
