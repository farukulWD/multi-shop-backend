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
exports.UserService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("./user.model");
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userData) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User data is required");
    }
    if (!userData.username || !userData.password || !userData.shops) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "All fields are required");
    }
    if (!userData.shops || userData.shops.length < 3) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "At least 3 shop names required");
    }
    const existing = yield user_model_1.User.findOne({
        shops: { $in: userData.shops.map((shop) => shop) },
    });
    if (existing) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "One or more shop names already taken");
    }
    const existingUser = yield user_model_1.User.findOne({ username: userData.username });
    if (existingUser) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "Username already exists");
    }
    console.log(JSON.stringify(userData));
    const newUser = yield user_model_1.User.create(userData);
    if (!newUser) {
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Failed to create user");
    }
    return newUser;
});
exports.UserService = {
    createUser,
};
