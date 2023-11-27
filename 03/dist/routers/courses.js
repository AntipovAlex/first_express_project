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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoursesRouter = void 0;
const express_1 = __importDefault(require("express"));
const types_1 = require("../types");
const getCourseViewModel_1 = require("../utils/getCourseViewModel");
const express_validator_1 = require("express-validator");
const title_validation_middleware_1 = require("../middlewares/title-validation-middleware");
const courses_servises_1 = require("../servises/courses.servises");
const getCoursesRouter = () => {
    const router = express_1.default.Router();
    const titleValidation = (0, express_validator_1.body)("title")
        .trim()
        .notEmpty()
        .isLength({ min: 3, max: 15 })
        .withMessage("Title lenght should be from 3 to 15 symbols and should not be empty");
    router.post("/", titleValidation, title_validation_middleware_1.titleValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const createCours = yield courses_servises_1.coursesServises.createCourse(req.body.title);
        return res.status(types_1.HTTP_STATUS.CREATED_201).json({
            id: createCours.id,
            title: createCours.title,
            _id: createCours._id,
        });
    }));
    router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const foudCoursTitle = yield courses_servises_1.coursesServises.findCourse(req.query.title);
        return res.json(foudCoursTitle.map(getCourseViewModel_1.getCourseViewModel));
    }));
    router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const foundCourse = yield courses_servises_1.coursesServises.findCourseById(Number(req.params.id));
        if (!foundCourse) {
            return res.sendStatus(types_1.HTTP_STATUS.NOT_FOUND_404);
        }
        return res.json((0, getCourseViewModel_1.getCourseViewModel)(foundCourse));
    }));
    router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const isDeleteCourse = yield courses_servises_1.coursesServises.deleteCourse(Number(req.params.id));
        isDeleteCourse
            ? res.sendStatus(types_1.HTTP_STATUS.NO_CONTENT_204)
            : res.sendStatus(types_1.HTTP_STATUS.NOT_FOUND_404);
    }));
    router.put("/:id", titleValidation, title_validation_middleware_1.titleValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const updateCourse = yield courses_servises_1.coursesServises.updateCourse(Number(req.params.id), req.body.title);
        if (!req.body.title) {
            return res.sendStatus(types_1.HTTP_STATUS.BAD_REQUEST_400);
        }
        if (!updateCourse) {
            return res.sendStatus(types_1.HTTP_STATUS.NOT_FOUND_404);
        }
        if (updateCourse) {
            const findCourse = yield courses_servises_1.coursesServises.findCourseById(Number(req.params.id));
            if (findCourse) {
                return res
                    .json((0, getCourseViewModel_1.getCourseViewModel)(findCourse))
                    .sendStatus(types_1.HTTP_STATUS.NO_CONTENT_204);
            }
        }
    }));
    return router;
};
exports.getCoursesRouter = getCoursesRouter;
