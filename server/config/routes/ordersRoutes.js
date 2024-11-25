import express from "express";

// auth middleware
import { auth } from "../../middlewares/auth.js";

// controller
import { ordersController } from "../../src/api/v1/controllers/ordersController.js";

const router = express.Router();

// routes
// creating orders - private
router.post("/orders", auth.checkAuthentication, ordersController.createOrder);

// getting puchases - private
router.get(
    "/orders/purchases",
    auth.checkAuthentication,
    ordersController.getPurchasesByUser
);

// getting sells - private
router.get(
    "/orders/sells",
    auth.checkAuthentication,
    ordersController.getSellsByUser
);

export default router;
