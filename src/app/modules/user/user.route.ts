import { Router } from "express";
import validateRequest from "../../middlewares/validatedRequest";
import { UserController } from "./user.controller";
import { userValidationSchema } from "./user.validation";

const router = Router();

router.post(
  "/sign-up",

  validateRequest(userValidationSchema),
  UserController.createUser
);

export const UserRoutes = router;
