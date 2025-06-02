import express, { Application } from "express";
import cors from "cors";

import config from "./app/config";
import cookieParser from "cookie-parser";

const app: Application = express();

// Middleware

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  `http://localhost:${config.PORT}`,
];

app.use(
  cors({
    origin: (origin, callback) => {
      console.log({ origin });
      if (!origin || allowedOrigins.includes(origin) || origin === "null") {
        callback(null, true);
      } else {
        // callback(new AppError(httpStatus.BAD_GATEWAY, "Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

export default app;
