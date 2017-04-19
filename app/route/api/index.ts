import { IRoutes } from "fawkesjs";
import { MainController } from "../../controller";
export const routes: IRoutes = [{
  acl: {
    target: "guest",
  },
  func: MainController.api,
  method: "get",
  remote: "/",
}];
