"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDb = exports.client = exports.db = void 0;
const mongodb_1 = require("mongodb");
const { MongoClient } = require("mongodb");
exports.db = {
    courses: [
        { id: 1, title: "front-end", _id: new mongodb_1.ObjectId() },
        { id: 2, title: "back-end", _id: new mongodb_1.ObjectId() },
        { id: 3, title: "QA Auto", _id: new mongodb_1.ObjectId() },
    ],
};
const url = process.env.mongoUrl || "mongodb://localhost:27017";
exports.client = new MongoClient(url);
function runDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.client.connect();
            const database = exports.client.db("product");
            console.log("Connect successfully to mongoDb ");
        }
        catch (_a) {
            // Ensures that the client will close when you finish/error
            console.log("Can not connect successfully to mongoDb ");
            yield exports.client.close();
        }
    });
}
exports.runDb = runDb;
