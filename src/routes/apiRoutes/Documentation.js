const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUiExpress = require("swagger-ui-express");
const Router = require("express").Router;
const documentationRouter = Router();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "Alus documentation",
      description: "Documentation for Alus API, powered by Swagger",
      version: "1.0.0",
    },
  },
  apis: ["./docs/**/*.yaml"],
};

const specs = swaggerJSDoc(swaggerOptions);

documentationRouter.use(
  "/api/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(specs)
);

module.exports = documentationRouter;
