import express, { Response, Request } from "express";
import { CourseViewModel } from "../models/CourseViewModels";
import { URIParamsIdCourseModel } from "../models/URIParamsIdCourseModels";
import {
  Errors,
  HTTP_STATUS,
  RequestBody,
  RequestParams,
  RequestParamsBody,
  RequestQuery,
} from "../types";
import { getCourseViewModel } from "../utils/getCourseViewModel";
import { coursesRepository } from "../repositories/courses-repositories";
import { body } from "express-validator";
import { titleValidationMiddleware } from "../middlewares/title-validation-middleware";

export const getCoursesRouter = () => {
  const router = express.Router();

  const titleValidation = body("title")
    .trim()
    .notEmpty()
    .isLength({ min: 3, max: 15 })
    .withMessage(
      "Title lenght should be from 3 to 15 symbols and should not be empty"
    );

  router.post(
    "/",
    titleValidation,
    titleValidationMiddleware,
    async (
      req: RequestBody<{ title: string }>,
      res: Response<CourseViewModel | Errors>
    ) => {
      const createCours = await coursesRepository.createCourse(req.body.title);
      res
        .status(HTTP_STATUS.CREATED_201)
        .json({ id: createCours.id, title: createCours.title });
    }
  );

  router.get(
    "/",
    async (
      req: RequestQuery<{ title: string }>,
      res: Response<CourseViewModel[]>
    ) => {
      const foudCoursTitle = await coursesRepository.findCourse(
        req.query.title
      );

      res.json(foudCoursTitle.map(getCourseViewModel));
    }
  );

  router.get(
    "/:id",
    async (
      req: RequestParams<URIParamsIdCourseModel>,
      res: Response<CourseViewModel>
    ) => {
      const foundCourse = await coursesRepository.findCourseById(
        Number(req.params.id)
      );

      if (!foundCourse) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
        return;
      }

      res.json(getCourseViewModel(foundCourse));
    }
  );

  router.delete(
    "/:id",
    async (
      req: RequestParams<URIParamsIdCourseModel>,
      res: Response<CourseViewModel>
    ) => {
      const isDeleteCourse = await coursesRepository.deleteCourse(
        Number(req.params.id)
      );

      isDeleteCourse
        ? res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
        : res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    }
  );

  router.put(
    "/:id",
    titleValidation,
    titleValidationMiddleware,
    async (
      req: RequestParamsBody<URIParamsIdCourseModel, { title: string }>,
      res: Response<CourseViewModel | Errors>
    ) => {
      const updateCourse = await coursesRepository.updateCourse(
        Number(req.params.id),
        req.body.title
      );

      if (!req.body.title) {
        res.sendStatus(HTTP_STATUS.BAD_REQUEST_400);
        return;
      }

      if (!updateCourse) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
        return;
      }

      if (updateCourse) {
        const findCourse = await coursesRepository.findCourseById(
          Number(req.params.id)
        );

        findCourse &&
          res
            .sendStatus(HTTP_STATUS.NO_CONTENT_204)
            .json(getCourseViewModel(findCourse));
      }
    }
  );

  return router;
};
