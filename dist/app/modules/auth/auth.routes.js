"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
router.post("/sign-in", auth_controller_1.AuthController.singIn);
router.get("/profile", auth_1.default, auth_controller_1.AuthController.getProfile);
router.post("/logout", auth_1.default, auth_controller_1.AuthController.logout);
exports.AuthRoutes = router;
