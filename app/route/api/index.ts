import { IRoute } from "fawkesjs";
import { MainController } from "../../controller";
export const routes: IRoute[] = [{
  acl: {
    target: "guest",
  },
  func: MainController.api,
  method: "get",
  remote: "/",
}];
