import express from "express";
import { getCoursesRouter } from "./routers/courses";
import { getHomeRouter } from "./routers/home";
import { getTestRouter } from "./routers/delete-db";

export const app = express();
export const port = process.env.PORT || 3000;

const appMiddelware = express.json();

app.use(appMiddelware);

app.use("/courses", getCoursesRouter());
app.use("/", getHomeRouter());
app.use("/__test__", getTestRouter());
