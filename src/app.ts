import express, { Application } from "express";
import cors from "cors";

import config from "./app/config";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";
import AppError from "./app/errors/AppError";
import httpStatus from "http-status";
import router from "./app/routes/routes";
import connectDB from "./app/utils/db";

const app: Application = express();

// Middleware

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://multi-shop-backend.vercel.app",
  "https://multi-shop-one.vercel.app",
  `http://localhost:${config.PORT}`,
];
const localhostSubdomainRegex = /^http:\/\/.*\.localhost:5173$/;
const vercelSubdomainRegex = /^https:\/\/.*\.vercel\.app$/;

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        localhostSubdomainRegex.test(origin) ||
        vercelSubdomainRegex.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new AppError(httpStatus.BAD_GATEWAY, "Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", async (req, res) => {
  res.send(`✅ Server is running! `);
});
app.use("/api/v1", router);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
