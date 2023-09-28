"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseViewModel = void 0;
const getCourseViewModel = (dbCourse) => {
    return { id: dbCourse.id, title: dbCourse.title };
};
exports.getCourseViewModel = getCourseViewModel;
