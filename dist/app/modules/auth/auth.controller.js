"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auth_service_1 = require("./auth.service");
const singIn = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singInData = req.body;
    const result = yield auth_service_1.AuthService.signin(singInData);
    res.cookie("token", result.token, {
        httpOnly: true,
        secure: config_1.default.NODE_ENV === "production",
        sameSite: config_1.default.NODE_ENV === "production" ? "none" : "lax",
        domain: config_1.default.NODE_ENV === "production"
            ? ".multi-shop-backend.vercel.app"
            : ".localhost",
        maxAge: singInData.rememberMe ? 7 * 24 * 60 * 60 * 1000 : 30 * 60 * 1000,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User signed in successfully",
        data: result,
    });
}));
const getProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.user.username;
    const user = yield auth_service_1.AuthService.getProfile(username);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User profile retrieved successfully",
        data: user,
    });
}));
const logout = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.logout();
    res.clearCookie("token");
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User logged out successfully",
        data: result,
    });
}));
exports.AuthController = {
    singIn,
    getProfile,
    logout,
};
