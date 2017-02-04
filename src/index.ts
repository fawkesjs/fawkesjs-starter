import * as http from "http";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as path from "path";
import { Config, Fawkes } from "fawkesjs";

// Init the express application
const app = Fawkes.app();
app.use(express.static(path.join(__dirname, "../public")));
app.use('/swagger', express.static(path.join(__dirname, "../swagger")));
Fawkes.activateRoute(app);
const server: http.Server = http.createServer(app);
server.listen(Config.port);
server.on("error", (e: Error) => {
  console.log("Error starting server" + e);
});
server.on("listening", () => {
  console.log("Server started on port " + Config.port);
});
