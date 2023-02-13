import mongoose from "mongoose";
import c from "config";

const dbUri = c.get<string>("dbUri");

const connect = async () => {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(dbUri).then(() => {
      console.log("Database connected ✔");
    });
  } catch (error) {
    console.error("Error while connecting to the database :", error);
  }
};

export default connect;
