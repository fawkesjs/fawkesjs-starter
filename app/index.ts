import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import { Config, Fawkes } from "fawkesjs";
import * as http from "http";
import * as path from "path";
import * as serveStatic from "serve-static";
import { IDI } from "./interface";
import { Orm } from "./lib";
const config = new Config({singleton: true});
// Init the express application
const app: express.Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("theSecretCookieSecret"));
app.use(express.static(path.join(__dirname, "../public")));
app.use("/swagger", express.static(path.join(__dirname, "../swagger")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
app.use(serveStatic(__dirname + "/../public", { maxAge: 0}));
const di: IDI =  {
  orm: new Orm(new Config({singleton: true}), {singleton: true}),
}
Fawkes.activateRoute(app, di);
const server: http.Server = http.createServer(app);
server.listen(config.port);
server.on("error", (e: Error) => {
  // tslint:disable-next-line no-console
  console.log("Error starting server" + e);
});
server.on("listening", () => {
  // tslint:disable-next-line no-console
  console.log("Server started on port " + config.port);
});
