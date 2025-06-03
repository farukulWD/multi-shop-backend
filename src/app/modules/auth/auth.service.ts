import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { ISignInData } from "./auth.interface";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";

const signin = async (singInData: ISignInData) => {
  const { username, password, rememberMe } = singInData;

  const user = await User.findOne({ username });
  if (!user) throw new AppError(httpStatus.NOT_FOUND, "User not found");

  const isMatch = await User.isPasswordMatched(password, user.password);

  if (!isMatch)
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");

  const token = jwt.sign(
    { _id: user._id, username: user.username },
    config.JWT_SECRET as string,
    {
      expiresIn: rememberMe ? "7d" : "30m",
    }
  );

  if (!token)
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to generate token"
    );

  return {
    user,
    token,
  };
};

const getProfile = async (username: string) => {
  const user = await User.findOne({ username }).select("username shops");
  if (!user) throw new AppError(httpStatus.NOT_FOUND, "User not found");
  return user;
};

const logout = async () => {
  return {};
};

export const AuthService = {
  signin,
  getProfile,
  logout,
};
