import express from "express";
import { db } from "./db/db";
import { getCoursesRouter } from "./routers/courses";
import { getHomeRouter } from "./routers/home";

export const app = express();
export const port = process.env.PORT || 3000;

const appMiddelware = express.json();

app.use(appMiddelware);

app.use("/courses", getCoursesRouter());
app.use("/", getHomeRouter());
