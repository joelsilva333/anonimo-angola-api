import { Router } from "express";
import userController from "@/controllers/user.controller";
import { authMiddleware } from "@/middleware/auth.middleware";

const router = Router();

router.get("/:id", authMiddleware, userController.getUserById);
router.put("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);
router.get("/", authMiddleware, userController.getAllUsers);

export default router;
