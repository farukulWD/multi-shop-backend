"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./app/config"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorhandler_1 = __importDefault(require("./app/middlewares/globalErrorhandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const AppError_1 = __importDefault(require("./app/errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const routes_1 = __importDefault(require("./app/routes/routes"));
const app = (0, express_1.default)();
// Middleware
// CORS
const allowedOrigins = [
    "http://localhost:5173",
    "https://multi-shop-backend.vercel.app",
    "https://multi-shop-one.vercel.app",
    `http://localhost:${config_1.default.PORT}`,
];
const localhostSubdomainRegex = /^http:\/\/.*\.localhost:5173$/;
const vercelSubdomainRegex = /^https:\/\/.*\.vercel\.app$/;
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        console.log({ localhostSubdomainRegex, origin });
        if (!origin ||
            allowedOrigins.includes(origin) ||
            localhostSubdomainRegex.test(origin) ||
            vercelSubdomainRegex.test(origin)) {
            callback(null, true);
        }
        else {
            callback(new AppError_1.default(http_status_1.default.BAD_GATEWAY, "Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.send("✅ Server is running!");
});
app.use("/api/v1", routes_1.default);
app.use(globalErrorhandler_1.default);
app.use(notFound_1.default);
exports.default = app;
