"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseViewModel = void 0;
const mongodb_1 = require("mongodb");
const getCourseViewModel = (dbCourse) => {
    return {
        id: dbCourse.id,
        title: dbCourse.title,
        _id: new mongodb_1.ObjectId().toString(),
    };
};
exports.getCourseViewModel = getCourseViewModel;
