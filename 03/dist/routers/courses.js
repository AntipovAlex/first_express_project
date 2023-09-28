"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoursesRouter = void 0;
const express_1 = __importDefault(require("express"));
const types_1 = require("../types");
const getCourseViewModel_1 = require("../utils/getCourseViewModel");
const getCoursesRouter = (db) => {
    const router = express_1.default.Router();
    router.post("/", (req, res) => {
        const createCours = { id: +new Date(), title: req.body.title };
        db.courses.push(createCours);
        res
            .status(types_1.HTTP_STATUS.CREATED_201)
            .json({ id: createCours.id, title: createCours.title });
    });
    router.get("/", (req, res) => {
        let foudCoursTitle = db.courses;
        if (req.query.title) {
            foudCoursTitle = foudCoursTitle.filter((c) => c.title.indexOf(req.query.title) > -1);
        }
        res.json(foudCoursTitle.map(getCourseViewModel_1.getCourseViewModel));
    });
    router.get("/:id", (req, res) => {
        const foundCours = db.courses.find((cours) => cours.id === Number(req.params.id));
        if (!foundCours) {
            res.sendStatus(types_1.HTTP_STATUS.NOT_FOUND_404);
            return;
        }
        res.json((0, getCourseViewModel_1.getCourseViewModel)(foundCours));
    });
    router.delete("/:id", (req, res) => {
        db.courses = db.courses.filter((cours) => cours.id !== Number(req.params.id));
        res.sendStatus(types_1.HTTP_STATUS.NO_CONTENT_204);
    });
    router.put("/:id", (req, res) => {
        if (!req.body.title) {
            res.sendStatus(types_1.HTTP_STATUS.BAD_REQUEST_400);
            return;
        }
        const foundCours = db.courses.find((cours) => cours.id === Number(req.params.id));
        if (!foundCours) {
            res.sendStatus(types_1.HTTP_STATUS.NOT_FOUND_404);
            return;
        }
        foundCours.title = req.body.title;
        res.json((0, getCourseViewModel_1.getCourseViewModel)(foundCours));
    });
    return router;
};
exports.getCoursesRouter = getCoursesRouter;
