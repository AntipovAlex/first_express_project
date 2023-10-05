import request from "supertest";
import { app } from "../src/app";
import { Course, HTTP_STATUS } from "../src/types";

describe("/course", () => {
  beforeAll(async () => {
    await request(app).delete("/__test__/data");
  });

  const pyton = "Pyton";
  const java = "Java";

  it("should return 200 and empty array", async () => {
    await request(app).get("/courses").expect(HTTP_STATUS.OK_200);
  });

  it("should return 404 for exiting course", async () => {
    await request(app).get("/courses/1").expect(HTTP_STATUS.NOT_FOUND_404);
  });

  it("shouldn't create course with incorrect data", async () => {
    await await request(app)
      .post("/courses")
      .send({ title: "" })
      .expect(HTTP_STATUS.BAD_REQUEST_400);

    await request(app).get("/courses").expect(HTTP_STATUS.OK_200);
  });

  let createCourse: Course;
  it("should create course with correct data", async () => {
    const respons = await request(app)
      .post("/courses")
      .send({ title: pyton })
      .expect(HTTP_STATUS.CREATED_201);

    createCourse = respons.body;
    expect(createCourse).toEqual({ id: expect.any(Number), title: pyton });
  });

  it("shouldn't update course with incorrect data", async () => {
    await request(app)
      .put("/courses/" + createCourse.id)
      .send({ title: "" })
      .expect(HTTP_STATUS.BAD_REQUEST_400);

    await request(app)
      .get("/courses/" + createCourse.id)
      .expect(HTTP_STATUS.OK_200, createCourse);
  });

  it("shouldn't update course not exist user", async () => {
    await request(app)
      .put("/courses/" + -2)
      .send({ title: java })
      .expect(HTTP_STATUS.NOT_FOUND_404);
  });

  it("should update course with correct data", async () => {
    await request(app)
      .put("/courses/" + createCourse.id)
      .send({ title: java })
      .expect(HTTP_STATUS.NO_CONTENT_204);

    await request(app)
      .get("/courses/" + createCourse.id)
      .expect(HTTP_STATUS.OK_200, { ...createCourse, title: java });
  });

  it("should dalate course with correct data", async () => {
    await request(app)
      .delete("/courses/" + createCourse.id)
      .expect(HTTP_STATUS.NO_CONTENT_204);

    await request(app)
      .get("/courses/" + createCourse.id)
      .expect(HTTP_STATUS.NOT_FOUND_404, {});
  });
});
