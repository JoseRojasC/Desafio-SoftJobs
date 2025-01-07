import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/", authMiddleware, userController.getUser); // Asegúrate de que esta ruta exista

export default router;
