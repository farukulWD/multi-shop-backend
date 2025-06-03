"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z
            .string({
            required_error: "Name is required",
        })
            .min(3, "Name must be at least 3 characters long"),
        password: zod_1.z
            .string()
            .min(6, { message: "Password must be at least 6 characters long" }),
        shops: zod_1.z.array(zod_1.z.object({
            name: zod_1.z.string({ message: "Shop name is required" }).min(2).max(100),
        })),
    }),
});
exports.userValidationSchema = userValidationSchema;
