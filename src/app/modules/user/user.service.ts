import AppError from "../../errors/AppError";
import { IUser } from "./user.interface";
import httpStatus from "http-status";
import { User } from "./user.model";

const createUser = async (userData: IUser) => {
  console.log({ userData });
  if (!userData) {
    throw new AppError(httpStatus.BAD_REQUEST, "User data is required");
  }

  if (!userData.username || !userData.password || !userData.shops) {
    throw new AppError(httpStatus.BAD_REQUEST, "All fields are required");
  }
  if (!userData.shops || userData.shops.length < 3) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "At least 3 shop names required"
    );
  }

  const existing = await User.findOne({ shops: { $in: userData.shops } });
  if (existing) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "One or more shop names already taken"
    );
  }

  const existingUser = await User.userFindByUserName(userData.username);
  if (existingUser) {
    throw new AppError(httpStatus.CONFLICT, "Username already exists");
  }

  const newUser = await User.create(userData);
  if (!newUser) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to create user"
    );
  }
  return newUser;
};

export const UserService = {
  createUser,
};
