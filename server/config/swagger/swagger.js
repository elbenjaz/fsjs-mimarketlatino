import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Mi Market Latino API",
      version: "1.0.0",
      description: "API para el manejo de usuarios, productos y órdenes.",
    },
    servers: [
      {
        url: "https://marketplace-backend-react-user-xwj0.onrender.com/api/v1",
      },
    ],
  },
  apis: ["src/api/v1/docs/api-docs.yaml"],
};

const specs = swaggerJsdoc(options);

export default (app) => {
  app.use(
    "/api/v1/docs", // url donde estaran disponibles los docs
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true,
      customCssUrl:
        "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-material.css",
    })
  );
};
