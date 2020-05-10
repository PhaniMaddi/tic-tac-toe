"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Typescript-node Reference
 * https://levelup.gitconnected.com/how-to-set-up-a-typescript-node-js-app-in-5-minutes-93ffee3b1768
 */
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const handlers_1 = require("./routes/handlers");
const app = express_1.default();
const port = process.env.PORT || "8000";
// view engine setup
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express_1.default.static(__dirname + "/views"));
app.get("/", handlers_1.rootHandler);
app.get("/hello/:name", handlers_1.helloHandler);
app.listen(port, (err) => {
    if (err)
        return console.error(err);
    return console.log(`Server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map