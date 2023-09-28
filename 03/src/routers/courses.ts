import express, { Response } from "express";
import { CourseViewModel } from "../models/CourseViewModels";
import { URIParamsIdCourseModel } from "../models/URIParamsIdCourseModels";
import {
  DBType,
  HTTP_STATUS,
  RequestBody,
  RequestParams,
  RequestParamsBody,
  RequestQuery,
} from "../types";
import { getCourseViewModel } from "../utils/getCourseViewModel";

export const getCoursesRouter = (db: DBType) => {
  const router = express.Router();

  router.post(
    "/",
    (req: RequestBody<{ title: string }>, res: Response<CourseViewModel>) => {
      const createCours = { id: +new Date(), title: req.body.title };

      db.courses.push(createCours);
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
      let foudCoursTitle = db.courses;

      if (req.query.title) {
        foudCoursTitle = foudCoursTitle.filter(
          (c) => c.title.indexOf(req.query.title) > -1
        );
      }
      res.json(foudCoursTitle.map(getCourseViewModel));
    }
  );

  router.get(
    "/:id",
    (
      req: RequestParams<URIParamsIdCourseModel>,
      res: Response<CourseViewModel>
    ) => {
      const foundCours = db.courses.find(
        (cours) => cours.id === Number(req.params.id)
      );

      if (!foundCours) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
        return;
      }

      res.json(getCourseViewModel(foundCours));
    }
  );

  router.delete(
    "/:id",
    (
      req: RequestParams<URIParamsIdCourseModel>,
      res: Response<CourseViewModel>
    ) => {
      db.courses = db.courses.filter(
        (cours) => cours.id !== Number(req.params.id)
      );

      res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
    }
  );

  router.put(
    "/:id",
    (
      req: RequestParamsBody<URIParamsIdCourseModel, { title: string }>,
      res: Response<CourseViewModel>
    ) => {
      if (!req.body.title) {
        res.sendStatus(HTTP_STATUS.BAD_REQUEST_400);
        return;
      }
      const foundCours = db.courses.find(
        (cours) => cours.id === Number(req.params.id)
      );

      if (!foundCours) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
        return;
      }

      foundCours.title = req.body.title;

      res.json(getCourseViewModel(foundCours));
    }
  );

  return router;
};
