import Config from "./src/api/v1/utils/Config.js";
import express from "express";
import cors from "cors";
// logger-express is incompatible with tests, it is necessary to comment on it
// import { logger } from 'logger-express';
import logger from "./middlewares/logger.js";
import swagger from "./config/swagger/swagger.js";

// routes
import loginRoutes from "./config/routes/loginRoutes.js";
import usersRoutes from "./config/routes/usersRoutes.js";
import productsRoutes from "./config/routes/productsRoutes.js";
import ordersRoutes from "./config/routes/ordersRoutes.js";
import favoritesRoutes from "./config/routes/favoritesRoutes.js";

// error controller
import { errorController } from "./src/api/v1/controllers/errorController.js";

let PORT = Config.get("PORT");

// manage port for tests
if (Config.get("ENVIRONMENT") == "test") {
    PORT = 0; //use a random port to avoid "listen EADDRINUSE: address already in use" with multiple test files
}

const app = express();

swagger(app);
app.use(express.json());
app.use(cors());
// app.use(logger());
app.use(logger);
app.get("/", (req, res) => {
    res.send(`✅ API online baby v${Config.get("VERSION")}`);
});
app.use("/api/v1", loginRoutes);
app.use("/api/v1", usersRoutes);
app.use("/api/v1", productsRoutes);
app.use("/api/v1", ordersRoutes);
app.use("/api/v1", favoritesRoutes);
app.use("*", errorController.error404);

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
    console.log(
        `Swagger docs available at http://localhost:${PORT}/api/v1/docs`
    );
    console.log(
        `Swagger production docs available at https://marketplace-backend-react-user-xwj0.onrender.com/api/v1/docs`
    );
});

export default app;
