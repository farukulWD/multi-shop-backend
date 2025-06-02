import dotenv from "dotenv";
import path from "path";

const envPath =
  process.env.NODE_ENV === "production"
    ? path.join(process.cwd(), ".env.production")
    : path.join(process.cwd(), ".env");

dotenv.config({ path: envPath });

export default {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5000,
  DB_URL: process.env.DB_URL || "mongodb://localhost:27017/multi-shop",
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || "1h",
  CLIENT_DOMAIN: process.env.CLIENT_DOMAIN || "http://localhost:5173",
  BYCRIPT_SALT_ROUNDS: process.env.BYCRIPT_SALT_ROUNDS || 10,

};
