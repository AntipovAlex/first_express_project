import { ObjectId } from "mongodb";
import { DBType } from "../types";
const { MongoClient } = require("mongodb");

export const db: DBType = {
  courses: [
    { id: 1, title: "front-end", _id: new ObjectId() },
    { id: 2, title: "back-end", _id: new ObjectId() },
    { id: 3, title: "QA Auto", _id: new ObjectId() },
  ],
};

const url = process.env.mongoUrl || "mongodb://localhost:27017";
export const client = new MongoClient(url);

export async function runDb() {
  try {
    await client.connect();
    const database = client.db("product");

    console.log("Connect successfully to mongoDb ");
  } catch {
    // Ensures that the client will close when you finish/error
    console.log("Can not connect successfully to mongoDb ");
    await client.close();
  }
}
