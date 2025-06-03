"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const auth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token)
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "No token provided");
    if (typeof token !== "string") {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid token type");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
        if (typeof decoded !== "object" || !decoded._id) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid token structure");
        }
        console.log(decoded);
        req.user = decoded;
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.default = auth;
