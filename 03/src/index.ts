import express, { Request, Response } from "express";
import {
  Cours,
  RequestBody,
  RequestParams,
  RequestParamsBody,
  RequestQuery,
} from "./types";
import { CourseViewModel } from "./models/CourseViewModels";
import { title } from "process";
import { URIParamsIdCourseModel } from "./models/URIParamsIdCourseModels";
const app = express();
const port = process.env.PORT || 3000;

const appMiddelware = express.json();

app.use(appMiddelware);

const db: { courses: Array<Cours> } = {
  courses: [
    { id: 1, title: "front-end" },
    { id: 2, title: "back-end" },
    { id: 3, title: "QA Auto" },
  ],
};

enum HTTP_STATUS {
  OK_200 = 200,
  CREATED_201 = 201,
  NO_CONTENT_204 = 204,
  BAD_REQUEST_400 = 400,
  NOT_FOUND_404 = 404,
}

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  res.send("Hello Users!I see your book!");
});

app.post(
  "/course",
  (req: RequestBody<{ title: string }>, res: Response<CourseViewModel>) => {
    const createCours = { id: +new Date(), title: req.body.title };

    db.courses.push(createCours);
    res.status(HTTP_STATUS.CREATED_201).json(createCours);
  }
);

app.get(
  "/course",
  (req: RequestQuery<{ title: string }>, res: Response<CourseViewModel[]>) => {
    let foudCoursTitle = db.courses;

    if (req.query.title) {
      foudCoursTitle = foudCoursTitle.filter(
        (c) => c.title.indexOf(req.query.title) > -1
      );
    }
    res.json(
      foudCoursTitle.map((db) => {
        return { id: db.id, title: db.title };
      })
    );
  }
);

app.get(
  "/course/:id",
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

    res.json({ id: foundCours.id, title: foundCours.title });
  }
);

app.delete(
  "/course/:id",
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

app.put(
  "/course/:id",
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

    res.json(foundCours);
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
