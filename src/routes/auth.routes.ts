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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
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
 *               phone_number:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro de validação
 */
router.post("/register", authController.register);

export default router;
