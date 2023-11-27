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
exports.coursesRepository = void 0;
const db_1 = require("../db/db");
const coursesCollection = db_1.client.db("courses").collection("course");
exports.coursesRepository = {
    findCourse(title) {
        return __awaiter(this, void 0, void 0, function* () {
            if (title) {
                return yield coursesCollection
                    .find({ title: { $regex: title } })
                    .toArray();
            }
            else {
                return yield coursesCollection.find({}).toArray();
            }
        });
    },
    createCourse(createCours) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield coursesCollection.insertOne(createCours);
        });
    },
    findCourseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield coursesCollection.findOne({
                id,
            });
        });
    },
    updateCourse(id, title) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield coursesCollection.updateOne({ id: id }, { $set: { title: title } });
            return result.matchedCount === 1;
        });
    },
    deleteCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield coursesCollection.deleteOne({ id: id });
            return result.deletedCount === 1;
        });
    },
};
