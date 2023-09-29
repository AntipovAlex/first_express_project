"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursesRepository = void 0;
const db_1 = require("../db/db");
exports.coursesRepository = {
    findCourse(title) {
        if (title) {
            const foudCoursTitle = db_1.db.courses.filter((c) => c.title.indexOf(title) > -1);
            return foudCoursTitle;
        }
        else {
            return db_1.db.courses;
        }
    },
    createCourse(title) {
        const createCours = { id: +new Date(), title: title };
        db_1.db.courses.push(createCours);
        return createCours;
    },
    findCourseById(id) {
        const foundCours = db_1.db.courses.find((cours) => cours.id === id);
        return foundCours;
    },
    updateCourse(id, title) {
        const foundCours = db_1.db.courses.find((cours) => cours.id === id);
        if (foundCours) {
            foundCours.title = title;
            return true;
        }
        else {
            return false;
        }
    },
    deleteCourse(id) {
        for (let i = 0; i < db_1.db.courses.length; i++) {
            if (db_1.db.courses[i].id === id) {
                db_1.db.courses.splice(i, 1);
                return true;
            }
        }
        return false;
    },
};
