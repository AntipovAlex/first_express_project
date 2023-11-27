import { client } from "../db/db";
import { coursesRepository } from "../repositories/courses-repositories";
import { Course } from "../types";

export const coursesServises = {
  async createCourse(title: string): Promise<Course> {
    const createCours = { id: +new Date(), title: title };
    return await coursesRepository.createCourse(createCours);
  },

  async findCourse(title: string): Promise<Course[]> {
    return await coursesRepository.findCourse(title);
  },

  async findCourseById(id: number): Promise<Course | undefined> {
    const foundCours: Course | undefined =
      await coursesRepository.findCourseById(id);

    if (foundCours) {
      return foundCours;
    } else {
      return undefined;
    }
  },

  async updateCourse(id: number, title: string): Promise<boolean> {
    return await coursesRepository.updateCourse(id, title);
  },

  async deleteCourse(id: number): Promise<boolean> {
    return await coursesRepository.deleteCourse(id);
  },
};
