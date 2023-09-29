import { db } from "../db/db";

export const coursesRepository = {
  findCourse(title: string) {
    if (title) {
      const foudCoursTitle = db.courses.filter(
        (c) => c.title.indexOf(title) > -1
      );

      return foudCoursTitle;
    } else {
      return db.courses;
    }
  },

  createCourse(title: string) {
    const createCours = { id: +new Date(), title: title };

    db.courses.push(createCours);
    return createCours;
  },

  findCourseById(id: number) {
    const foundCours = db.courses.find((cours) => cours.id === id);
    return foundCours;
  },

  updateCourse(id: number, title: string) {
    const foundCours = db.courses.find((cours) => cours.id === id);
    if (foundCours) {
      foundCours.title = title;
      return true;
    } else {
      return false;
    }
  },

  deleteCourse(id: number) {
    for (let i = 0; i < db.courses.length; i++) {
      if (db.courses[i].id === id) {
        db.courses.splice(i, 1);
        return true;
      }
    }
    return false;
  },
};
