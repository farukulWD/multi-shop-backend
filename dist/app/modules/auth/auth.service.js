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
exports.AuthService = void 0;
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signin = (singInData) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, rememberMe } = singInData;
    const user = yield user_model_1.User.findOne({ username });
    if (!user)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    const isMatch = yield user_model_1.User.isPasswordMatched(password, user.password);
    if (!isMatch)
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid credentials");
    const token = jsonwebtoken_1.default.sign({ _id: user._id, username: user.username }, config_1.default.JWT_SECRET, {
        expiresIn: rememberMe ? "7d" : "30m",
    });
    if (!token)
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Failed to generate token");
    return {
        user,
        token,
    };
});
const getProfile = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ username }).select("username shops");
    if (!user)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    return user;
});
const logout = () => __awaiter(void 0, void 0, void 0, function* () {
    return {};
});
exports.AuthService = {
    signin,
    getProfile,
    logout,
};
