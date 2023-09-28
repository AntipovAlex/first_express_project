import { CourseViewModel } from "../models/CourseViewModels";
import { Course } from "../types";

export const getCourseViewModel = (dbCourse: Course): CourseViewModel => {
  return { id: dbCourse.id, title: dbCourse.title };
};
