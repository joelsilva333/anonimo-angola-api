/* import swaggerUi from "swagger-ui-express"
import { swaggerSpec } from "@/swagger" */
import userController from "@/controllers/user.controller";
import { Router, Response, Request } from "express";

const routes = Router();

/* routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)) */
routes.post("/api/users/create", userController.createUser);
routes.get("/", (request: Request, res: Response) => {
  res.status(200).send({ success: true });
});

export default routes;
