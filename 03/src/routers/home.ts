import express, { Request, Response } from "express";

export const getHomeRouter = () => {
  const router = express.Router();

  router.get("/", (req: Request, res: Response) => {
    res.send("Hello World!!!!!!!!!!!");
  });

  router.get("/users", (req, res) => {
    res.send("Hello Users!I see your book!");
  });

  return router;
};
