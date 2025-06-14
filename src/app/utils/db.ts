import mongoose from "mongoose";
import config from "../config";
import { logger } from "../shared/logger";

const connectDB = async () => {
  try {
    await mongoose.connect(config.DB_URL as string, {
      serverSelectionTimeoutMS: 10000, 
    });

    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
