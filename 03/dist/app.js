"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const courses_1 = require("./routers/courses");
const home_1 = require("./routers/home");
const delete_db_1 = require("./routers/delete-db");
exports.app = (0, express_1.default)();
exports.port = process.env.PORT || 5000;
const appMiddelware = express_1.default.json();
exports.app.use(appMiddelware);
exports.app.use("/courses", (0, courses_1.getCoursesRouter)());
exports.app.use("/", (0, home_1.getHomeRouter)());
exports.app.use("/__test__", (0, delete_db_1.getTestRouter)());
