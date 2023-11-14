import { app, port } from "./app";
import { runDb } from "./db/db";

const startApp = async () => {
  await runDb();
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

startApp();
