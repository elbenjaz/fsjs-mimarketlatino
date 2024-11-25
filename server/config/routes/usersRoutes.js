import express from "express";

// auth middleware
import { auth } from "../../middlewares/auth.js";

// controller
import { usersController } from "../../src/api/v1/controllers/usersController.js";

const router = express.Router();

// routes
// creating user - public
router.post("/users", usersController.createUser);

// getting users - private
router.get(
    "/users/:id_user",
    auth.checkAuthentication,
    usersController.getUser
);

// editing user - private
router.put(
    "/users/:id_user",
    auth.checkAuthentication,
    usersController.editUser
);

export default router;
