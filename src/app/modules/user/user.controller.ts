import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { IUser } from "./user.interface";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const userData: IUser = req.body;

  const user = await UserService.createUser(userData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User created successfully",
    data: user,
  });
});

export const UserController = {
  createUser,
};
