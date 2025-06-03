"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const validatedRequest_1 = __importDefault(require("../../middlewares/validatedRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = (0, express_1.Router)();
router.post("/sign-up", (0, validatedRequest_1.default)(user_validation_1.userValidationSchema), user_controller_1.UserController.createUser);
exports.UserRoutes = router;
