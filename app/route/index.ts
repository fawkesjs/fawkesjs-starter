import { MainController } from "../controller";
import { IRoutes, IRoutesConfig } from "fawkesjs";
export const config: IRoutesConfig = {
  swagger: false,
  preCtrls: []
}
export const routes: IRoutes = [{
  remote: '/',
  func: MainController.index,
  method: 'get'
}]
