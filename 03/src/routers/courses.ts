import express, { Response } from "express";
import { CourseViewModel } from "../models/CourseViewModels";
import { URIParamsIdCourseModel } from "../models/URIParamsIdCourseModels";
import {
  HTTP_STATUS,
  RequestBody,
  RequestParams,
  RequestParamsBody,
  RequestQuery,
} from "../types";
import { getCourseViewModel } from "../utils/getCourseViewModel";
import { coursesRepository } from "../repositories/courses-repositories";

export const getCoursesRouter = () => {
  const router = express.Router();

  router.post(
    "/",
    (req: RequestBody<{ title: string }>, res: Response<CourseViewModel>) => {
      const createCours = coursesRepository.createCourse(req.body.title);
      res
        .status(HTTP_STATUS.CREATED_201)
        .json({ id: createCours.id, title: createCours.title });
    }
  );

  router.get(
    "/",
    (
      req: RequestQuery<{ title: string }>,
      res: Response<CourseViewModel[]>
    ) => {
      const foudCoursTitle = coursesRepository.findCourse(req.query.title);

      res.json(foudCoursTitle.map(getCourseViewModel));
    }
  );

  router.get(
    "/:id",
    (
      req: RequestParams<URIParamsIdCourseModel>,
      res: Response<CourseViewModel>
    ) => {
      const foundCourse = coursesRepository.findCourseById(
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
    (
      req: RequestParams<URIParamsIdCourseModel>,
      res: Response<CourseViewModel>
    ) => {
      const isDeleteCourse = coursesRepository.deleteCourse(
        Number(req.params.id)
      );

      isDeleteCourse
        ? res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
        : res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    }
  );

  router.put(
    "/:id",
    (
      req: RequestParamsBody<URIParamsIdCourseModel, { title: string }>,
      res: Response<CourseViewModel>
    ) => {
      const updateCourse = coursesRepository.updateCourse(
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
        const findCourse = coursesRepository.findCourseById(
          Number(req.params.id)
        );

        findCourse && res.json(getCourseViewModel(findCourse));
      }
    }
  );

  return router;
};
