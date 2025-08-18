import postController from "@/controllers/post.controller";
import { authMiddleware } from "@/middleware/auth.middleware";
import { Router } from "express";

const router = Router();

router.post("/:id", authMiddleware, postController.create);
router.get("/", authMiddleware, postController.getAll);

export default router;
