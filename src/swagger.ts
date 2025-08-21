import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { Express } from "express";

export function setupSwagger(app: Express) {
  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Anônimo Angola API",
        version: "1.0.0",
        description: "API para desabafos anônimos, com autenticação JWT",
      },
      servers: [
        {
          url: "https://anonimo-angola-api.onrender.com",
          description: "Servidor Local",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
    apis: ["./src/routes/*.ts"],
  };

  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}
