import mongoose from "mongoose";
import c from "config";
import logger from "./logger";

const dbUri = c.get<string>("dbUri");

const connect = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(dbUri).then(() => {
      logger.info("Database connected");
    });
  } catch (error) {
    logger.error("Error while connecting to the database :", error);
  }
};

export default connect;
