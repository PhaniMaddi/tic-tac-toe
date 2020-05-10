"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const helloBuilder = (name) => ({ hello: name });
exports.rootHandler = (_req, res) => {
    return res.render(path_1.default.join(__dirname, "../views/index.ejs"));
};
exports.helloHandler = (req, res) => {
    const { params } = req;
    const { name = "World" } = params;
    const response = helloBuilder(name);
    return res.json(response);
};
//# sourceMappingURL=handlers.js.map