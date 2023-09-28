"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHomeRouter = void 0;
const express_1 = __importDefault(require("express"));
const getHomeRouter = (db) => {
    const router = express_1.default.Router();
    router.get("/", (req, res) => {
        res.send("Hello World!!!!!!!!!!!");
    });
    router.get("/users", (req, res) => {
        res.send("Hello Users!I see your book!");
    });
    return router;
};
exports.getHomeRouter = getHomeRouter;
