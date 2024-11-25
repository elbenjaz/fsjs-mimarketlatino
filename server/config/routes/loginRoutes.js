import express from "express";

// auth middleware
import { auth } from "../../middlewares/auth.js";

// controller
import { loginController } from "../../src/api/v1/controllers/loginController.js";

const router = express.Router();

// routes
router.post("/login", loginController.login);
router.post("/loginWithGoogle", auth.checkGoogleAuthentication, loginController.loginWithGoogle);

export default router;
