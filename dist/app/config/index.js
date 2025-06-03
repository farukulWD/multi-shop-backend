"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const envPath = process.env.NODE_ENV === "production"
    ? path_1.default.join(process.cwd(), ".env.production")
    : path_1.default.join(process.cwd(), ".env");
dotenv_1.default.config({ path: envPath });
exports.default = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || 5000,
    DB_URL: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || "1h",
    CLIENT_DOMAIN: process.env.CLIENT_DOMAIN || "http://localhost:5173",
    BYCRIPT_SALT_ROUNDS: process.env.BYCRIPT_SALT_ROUNDS || 10,
};
