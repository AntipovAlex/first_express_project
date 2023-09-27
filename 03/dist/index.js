"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const appMiddelware = express_1.default.json();
app.use(appMiddelware);
const db = {
    courses: [
        { id: 1, title: "front-end" },
        { id: 2, title: "back-end" },
        { id: 3, title: "QA Auto" },
    ],
};
var HTTP_STATUS;
(function (HTTP_STATUS) {
    HTTP_STATUS[HTTP_STATUS["OK_200"] = 200] = "OK_200";
    HTTP_STATUS[HTTP_STATUS["CREATED_201"] = 201] = "CREATED_201";
    HTTP_STATUS[HTTP_STATUS["NO_CONTENT_204"] = 204] = "NO_CONTENT_204";
    HTTP_STATUS[HTTP_STATUS["BAD_REQUEST_400"] = 400] = "BAD_REQUEST_400";
    HTTP_STATUS[HTTP_STATUS["NOT_FOUND_404"] = 404] = "NOT_FOUND_404";
})(HTTP_STATUS || (HTTP_STATUS = {}));
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.get("/users", (req, res) => {
    res.send("Hello Users!I see your book!");
});
app.post("/course", (req, res) => {
    const createCours = { id: +new Date(), title: req.body.title };
    db.courses.push(createCours);
    res.status(HTTP_STATUS.CREATED_201).json(createCours);
});
app.get("/course", (req, res) => {
    let foudCoursTitle = db.courses;
    if (req.query.title) {
        foudCoursTitle = foudCoursTitle.filter((c) => c.title.indexOf(req.query.title) > -1);
    }
    res.json(foudCoursTitle);
});
app.get("/course/:id", (req, res) => {
    const foundCours = db.courses.find((cours) => cours.id === Number(req.params.id));
    if (!foundCours) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
        return;
    }
    res.json(foundCours);
});
app.delete("/course/:id", (req, res) => {
    db.courses = db.courses.filter((cours) => cours.id !== Number(req.params.id));
    res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
});
app.put("/course/:id", (req, res) => {
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUS.BAD_REQUEST_400);
        return;
    }
    const foundCours = db.courses.find((cours) => cours.id === Number(req.params.id));
    if (!foundCours) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
        return;
    }
    foundCours.title = req.body.title;
    res.json(foundCours);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
