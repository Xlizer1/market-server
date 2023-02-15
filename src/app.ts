import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import router from "./router";
import cors from "cors";

const port = config.get<number>("port");

const start = async () => {
  try {
    await connect();

    const app = express();

    app.use(express.json());

    app.use(express.urlencoded({ extended: false }));

    app.use(cors);

    router(app);

    app.listen(port, () => logger.info(`listening on port ${port}`));
  } catch (error) {
    logger.error(error);
  }
};

start();
