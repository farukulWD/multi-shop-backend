import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import httpStatus from "http-status";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) throw new AppError(httpStatus.UNAUTHORIZED, "No token provided");
  if (typeof token !== "string") {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token type");
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET as string);
    if (typeof decoded !== "object" || !decoded._id) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token structure");
    }

    console.log(decoded)
    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

export default auth;
