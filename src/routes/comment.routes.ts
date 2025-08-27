import commentController from "@/controllers/comment.controller";
import { authMiddleware } from "@/middleware/auth.middleware";
import { Router } from "express";

const router = Router();

router.post("/:id", authMiddleware, commentController.create);
router.put("/", authMiddleware, commentController.update);

export default router;
