import { Request } from "express";
import { ValidationError } from "express-validator";

export type Course = { id: number; title: string };

export type RequestBody<B> = Request<{}, {}, B>;
export type RequestQuery<Q> = Request<{}, {}, {}, Q>;
export type RequestParams<P> = Request<P>;
export type RequestParamsBody<P, B> = Request<P, {}, B>;

export enum HTTP_STATUS {
  OK_200 = 200,
  CREATED_201 = 201,
  NO_CONTENT_204 = 204,
  BAD_REQUEST_400 = 400,
  NOT_FOUND_404 = 404,
}

export type DBType = { courses: Array<Course> };

export type Errors = {
  errors: ValidationError[];
};
