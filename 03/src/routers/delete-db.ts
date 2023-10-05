import express, { Request, Response } from "express";
import { HTTP_STATUS } from "../types";
import { db } from "../db/db";

export const getTestRouter = () => {
  const router = express.Router();

  router.delete("/data", (req: Request, res: Response) => {
    db.courses = [];
    res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
  });

  return router;
};
