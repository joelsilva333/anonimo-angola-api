import { Router } from "express";
import userController from "@/controllers/user.controller";
import { authMiddleware } from "@/middleware/auth.middleware";

const router = Router();

/**
* @swagger
* tags:
*   name: Users
*   description: Gerenciamento de usuários
*/

/**
* @swagger
* components:
*   schemas:
*     User:
*       type: object
*       properties:
*         id:
*           type: string
*           example: "d93b3e28-56f9-4a92-9d01-5f91b2c3e001"
*         anon_name:
*           type: string
*           example: "Anon123"
*         phone_number:
*           type: string
*           example: "+5511999999999"
*         role:
*           type: string
*           example: "user"
*         is_active:
*           type: boolean
*           example: true
*     UpdateUserInput:
*       type: object
*       properties:
*         anon_name:
*           type: string
*           example: "Anon987"
*         phone_number:
*           type: string
*           example: "+5511888888888"
*/

/**
* @swagger
* /users/{id}:
*   get:
*     summary: Buscar um usuário por ID
*     tags: [Users]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: ID do usuário a ser buscado
*     responses:
*       200:
*         description: Usuário encontrado
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       500:
*         description: Erro interno do servidor
*/
router.get("/:id", authMiddleware, userController.getUserById);

/**
* @swagger
* /users/{id}:
*   put:
*     summary: Atualizar informações do usuário
*     tags: [Users]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: ID do usuário a ser atualizado
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/UpdateUserInput'
*     responses:
*       200:
*         description: Usuário atualizado com sucesso
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: "Usuário atualizado com sucesso"
*                 user:
*                   $ref: '#/components/schemas/User'
*       400:
*         description: Erro de validação
*       500:
*         description: Erro interno do servidor
*/
router.put("/:id", authMiddleware, userController.updateUser);

/**
* @swagger
* /users/{id}:
*   delete:
*     summary: Deletar um usuário
*     tags: [Users]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: ID do usuário a ser deletado
*     responses:
*       204:
*         description: Usuário deletado com sucesso
*       500:
*         description: Erro interno do servidor
*/
router.delete("/:id", authMiddleware, userController.deleteUser);

/**
* @swagger
* /users:
*   get:
*     summary: Listar todos os usuários
*     tags: [Users]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: Lista de usuários
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/User'
*       500:
*         description: Erro interno do servidor
*/
router.get("/", authMiddleware, userController.getAllUsers);

export default router;
