import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const singIn = catchAsync(async (req, res) => {
  const singInData = req.body;
  const result = await AuthService.signin(singInData);

  res.cookie("token", result.token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    domain: ".multi-shop-backend.vercel.app",
    // domain: "localhost",
    maxAge: singInData.rememberMe ? 7 * 24 * 60 * 60 * 1000 : 30 * 60 * 1000,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User signed in successfully",
    data: result,
  });
});

const getProfile = catchAsync(async (req, res) => {
  const username = req.user.username;

  const user = await AuthService.getProfile(username);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User profile retrieved successfully",
    data: user,
  });
});

const logout = catchAsync(async (req, res) => {
  const result = await AuthService.logout();
  res.clearCookie("token");

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged out successfully",
    data: result,
  });
});

export const AuthController = {
  singIn,
  getProfile,
  logout,
};
