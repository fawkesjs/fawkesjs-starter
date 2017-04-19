import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import { Config, Fawkes } from "fawkesjs";
import * as http from "http";
import * as path from "path";
import * as serveStatic from "serve-static";

// Init the express application
const app = Fawkes.app();
app.use(cookieParser("theSecretCookieSecret"));
app.use(express.static(path.join(__dirname, "../public")));
app.use("/swagger", express.static(path.join(__dirname, "../swagger")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
app.use(serveStatic(__dirname + "/../public", { maxAge: 0}));
Fawkes.activateRoute(app);
const server: http.Server = http.createServer(app);
server.listen(Config.port);
server.on("error", (e: Error) => {
  // tslint:disable-next-line no-console
  console.log("Error starting server" + e);
});
server.on("listening", () => {
  // tslint:disable-next-line no-console
  console.log("Server started on port " + Config.port);
});
