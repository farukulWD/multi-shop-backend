import { Router } from "express";
import { AuthController } from "./auth.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post("/sign-in", AuthController.singIn);
router.get("/profile", auth, AuthController.getProfile);
router.post("/logout", auth, AuthController.logout);

export const AuthRoutes = router;
