import { todoController } from "../controllers/todo.controller.js";
import { authMiddleware, logRequests } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.get("/", logRequests, authMiddleware, todoController.read);
router.get("/:id", logRequests, authMiddleware, todoController.readById);
router.post("/", logRequests, authMiddleware, todoController.create);
router.put("/:id", logRequests, authMiddleware, todoController.update);
router.delete("/:id", logRequests, authMiddleware, todoController.remove);

export default router;
