/**
 * Typescript-node Reference
 * https://levelup.gitconnected.com/how-to-set-up-a-typescript-node-js-app-in-5-minutes-93ffee3b1768
 */
import express from "express";
import path from "path";
import { rootHandler, helloHandler } from "./routes/handlers";

const app = express();
const port = process.env.PORT || "8000";

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/views"));

app.get("/", rootHandler);
app.get("/hello/:name", helloHandler);

app.listen(port, (err) => {
  if (err) return console.error(err);
  return console.log(`Server is listening on ${port}`);
});
