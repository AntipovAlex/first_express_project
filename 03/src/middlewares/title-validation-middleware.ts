import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { HTTP_STATUS } from "../types";

export const titleValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST_400)
      .json({ errors: errors.array() });
  } else {
    return next();
  }
};
