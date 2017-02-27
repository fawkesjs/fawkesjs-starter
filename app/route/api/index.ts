import { MainController } from "../../controller";
import { IRoutes } from "fawkesjs";
export const routes: IRoutes = [{
  remote: '/',
  func: MainController.api,
  acl: {
    target: 'guest'
  },
  method: 'get'
}]
