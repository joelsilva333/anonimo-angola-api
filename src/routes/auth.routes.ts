import { Router } from "express";
import authController from "@/controllers/auth.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticação e criação de usuários
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Fazer login e receber JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - anon_name
 *               - password
 *             properties:
 *               anon_name:
 *                 type: string
 *                 example: "joel123"
 *               password:
 *                 type: string
 *                 example: "minhaSenha@123"
 *     responses:
 *       200:
 *         description: Sessão iniciada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sessão iniciada com sucesso"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "c0a80123-ab12-4f56-9abc-987654321000"
 *                     anon_name:
 *                       type: string
 *                       example: "joel123"
 *                     phone_number:
 *                       type: string
 *                       example: "+244900000000"
 *                     role:
 *                       type: string
 *                       example: "user"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-08-21T14:15:22.000Z"
 *                     is_active:
 *                       type: boolean
 *                       example: true
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             example:
 *               error: "Erro de validação"
 *               details:
 *                 - property: "anon_name"
 *                   constraints:
 *                     isNotEmpty: "anon_name não pode estar vazio"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Erro interno do servidor"
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Criar um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - anon_name
 *               - phone_number
 *               - password
 *             properties:
 *               anon_name:
 *                 type: string
 *                 example: "joel123"
 *               phone_number:
 *                 type: string
 *                 example: "+244900000000"
 *               password:
 *                 type: string
 *                 example: "minhaSenha@123"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário criado com sucesso"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "c0a80123-ab12-4f56-9abc-987654321000"
 *                     anon_name:
 *                       type: string
 *                       example: "joel123"
 *                     phone_number:
 *                       type: string
 *                       example: "+244900000000"
 *                     is_active:
 *                       type: boolean
 *                       example: true
 *                     role:
 *                       type: string
 *                       example: "user"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-08-21T14:15:22.000Z"
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             example:
 *               error: "Erro de validação"
 *               details:
 *                 - property: "phone_number"
 *                   constraints:
 *                     isNotEmpty: "phone_number não pode estar vazio"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Erro interno do servidor"
 */
router.post("/register", authController.register);


export default router;
