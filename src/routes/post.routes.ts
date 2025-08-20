import postController from "@/controllers/post.controller";
import { authMiddleware } from "@/middleware/auth.middleware";
import { Router } from "express";

const router = Router();

router.post("/:id", authMiddleware, postController.create);
router.get("/", authMiddleware, postController.getAll);
router.get("/:id", authMiddleware, postController.getById);
router.get("/user/:userId", authMiddleware, postController.getAllByUserId);
router.put("/:id", authMiddleware, postController.updatePost);
router.delete("/:id", authMiddleware, postController.deletePost);

export default router;
