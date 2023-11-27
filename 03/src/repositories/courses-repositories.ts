import { client } from "../db/db";
import { Course } from "../types";

const coursesCollection = client.db("courses").collection("course");

export const coursesRepository = {
  async findCourse(title: string): Promise<Course[]> {
    if (title) {
      return await coursesCollection
        .find({ title: { $regex: title } })
        .toArray();
    } else {
      return await coursesCollection.find({}).toArray();
    }
  },

  async createCourse(createCours: Omit<Course, "_id">): Promise<Course> {
    return await coursesCollection.insertOne(createCours);
  },

  async findCourseById(id: number): Promise<Course | undefined> {
    return await coursesCollection.findOne({
      id,
    });
  },

  async updateCourse(id: number, title: string): Promise<boolean> {
    const result = await coursesCollection.updateOne(
      { id: id },
      { $set: { title: title } }
    );
    return result.matchedCount === 1;
  },

  async deleteCourse(id: number): Promise<boolean> {
    const result = await coursesCollection.deleteOne({ id: id });

    return result.deletedCount === 1;
  },
};
