import { Request } from "express";

export type Cours = { id: number; title: string };

export type RequestBody<B> = Request<{}, {}, B>;
export type RequestQuery<Q> = Request<{}, {}, {}, Q>;
export type RequestParams<P> = Request<P>;
export type RequestParamsBody<P, B> = Request<P, {}, B>;
