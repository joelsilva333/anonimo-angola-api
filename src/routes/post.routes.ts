import postController from "@/controllers/post.controller"
import { authMiddleware } from "@/middleware/auth.middleware"
import { Router } from "express"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Gerenciamento de posts
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "abc123"
 *         anon_name:
 *           type: string
 *           example: "joel123"
 *         text:
 *           type: string
 *           example: "Hoje estou me sentindo melhor."
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2025-08-21T14:15:22.000Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           example: "2025-08-21T15:00:00.000Z"
 *         status:
 *           type: string
 *           example: "active"
 *     CreatePostInput:
 *       type: object
 *       required:
 *         - text
 *       properties:
 *         text:
 *           type: string
 *           example: "Hoje estou me sentindo melhor."
 *     UpdatePostInput:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           example: "Texto atualizado do post."
 *         status:
 *           type: string
 *           example: "active"
 */

/**
 * @swagger
 * /posts/{id}:
 *   post:
 *     summary: Criar um novo post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário dono do post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePostInput'
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Erro de validação
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Listar todos os posts
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Buscar post por ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do post
 *     responses:
 *       200:
 *         description: Post encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /posts/user/{userId}:
 *   get:
 *     summary: Listar posts por ID de usuário
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário dono dos posts
 *     responses:
 *       200:
 *         description: Lista de posts do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Atualizar um post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do post a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePostInput'
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Erro de validação
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Deletar um post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do post a ser deletado
 *     responses:
 *       204:
 *         description: Post deletado com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

router.post("/:id", authMiddleware, postController.create)

router.get("/", authMiddleware, postController.getAll)

router.get("/:id", authMiddleware, postController.getById)

router.get("/user/:userId", authMiddleware, postController.getAllByUserId)

router.put("/:id", authMiddleware, postController.updatePost)

router.delete("/:id", authMiddleware, postController.deletePost)

export default router
