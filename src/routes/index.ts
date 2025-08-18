/* import swaggerUi from "swagger-ui-express"
import { swaggerSpec } from "@/swagger" */
import authController from "@/controllers/auth.controller"
import userController from "@/controllers/user.controller"
import { authMiddleware } from "@/middleware/auth.middleware"
import { Router, Response, Request } from "express"

const routes = Router()

/* routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)) */
routes.post("/api/auth/login", authController.login)
routes.get("/api/api/users/:id", authMiddleware, userController.getUser)
routes.get("/api/users", authMiddleware, userController.getAllUsers)
routes.post("/api/users/create", userController.createUser)
routes.get("/", (request: Request, res: Response) => {
	res.status(200).send({ success: true })
})

export default routes
