"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoursesRouter = void 0;
const express_1 = __importDefault(require("express"));
const types_1 = require("../types");
const getCourseViewModel_1 = require("../utils/getCourseViewModel");
const courses_repositories_1 = require("../repositories/courses-repositories");
const getCoursesRouter = () => {
    const router = express_1.default.Router();
    router.post("/", (req, res) => {
        const createCours = courses_repositories_1.coursesRepository.createCourse(req.body.title);
        res
            .status(types_1.HTTP_STATUS.CREATED_201)
            .json({ id: createCours.id, title: createCours.title });
    });
    router.get("/", (req, res) => {
        const foudCoursTitle = courses_repositories_1.coursesRepository.findCourse(req.query.title);
        res.json(foudCoursTitle.map(getCourseViewModel_1.getCourseViewModel));
    });
    router.get("/:id", (req, res) => {
        const foundCourse = courses_repositories_1.coursesRepository.findCourseById(Number(req.params.id));
        if (!foundCourse) {
            res.sendStatus(types_1.HTTP_STATUS.NOT_FOUND_404);
            return;
        }
        res.json((0, getCourseViewModel_1.getCourseViewModel)(foundCourse));
    });
    router.delete("/:id", (req, res) => {
        const isDeleteCourse = courses_repositories_1.coursesRepository.deleteCourse(Number(req.params.id));
        isDeleteCourse
            ? res.sendStatus(types_1.HTTP_STATUS.NO_CONTENT_204)
            : res.sendStatus(types_1.HTTP_STATUS.NOT_FOUND_404);
    });
    router.put("/:id", (req, res) => {
        const updateCourse = courses_repositories_1.coursesRepository.updateCourse(Number(req.params.id), req.body.title);
        if (!req.body.title) {
            res.sendStatus(types_1.HTTP_STATUS.BAD_REQUEST_400);
            return;
        }
        if (!updateCourse) {
            res.sendStatus(types_1.HTTP_STATUS.NOT_FOUND_404);
            return;
        }
        if (updateCourse) {
            const findCourse = courses_repositories_1.coursesRepository.findCourseById(Number(req.params.id));
            findCourse && res.json((0, getCourseViewModel_1.getCourseViewModel)(findCourse));
        }
    });
    return router;
};
exports.getCoursesRouter = getCoursesRouter;
