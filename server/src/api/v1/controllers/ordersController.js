// model
import { orderModel } from "../models/orderModel.js";
import { productModel } from "../models/productModel.js";

// method: POST
const createOrder = async (req, res) => {
    let error;
    
    try {
        const id_user = req.auth.id_user;
        const orderData = { ...req.body, id_user };

        const id_product = Array.isArray(orderData.products) ? orderData.products.map(product => product.id_product || 0 ) : null;

        if (!id_product || !id_product.length) {
            error = { error: "Required parameters are missing." };
            res.locals.statusText = error;
            return res.status(400).json(error);
        }

        //validate products
        const products = await productModel.getProducts({
            id_product : id_product
        });

        if (!products || (products.length !== orderData.products.length)) {
            error = { error: "Products does not exist." };
            res.locals.statusText = error;
            return res.status(400).json(error);
        }

        const order = await orderModel.createOrder(orderData);
        res.locals.statusText = order;
        return res.status(201).json(order);
    } catch (e) {
        error = { error: `${e.message}` };
        res.locals.statusText = error;
        return res.status(500).json(error);
    }
};

// method: GET
const getPurchasesByUser = async (req, res) => {
    let error;

    try {
        const id_user = req.auth.id_user;
        const orders = await orderModel.getPurchases(id_user);

        if (!orders) {
            error = { error: "Order not found" };
            res.locals.statusText = error;
            return res.status(404).json(error);
        }

        res.locals.statusText = orders;
        return res.status(200).json(orders);
    } catch (e) {
        error = { error: `${e.message}` };
        res.locals.statusText = error;
        return res.status(500).json(error);
    }
};

// method: GET
const getSellsByUser = async (req, res) => {
    let error;

    try {
        const id_user = req.auth.id_user;
        const orders = await orderModel.getSells(id_user);

        if (!orders) {
            error = { error: "Order not found" };
            res.locals.statusText = error;
            return res.status(404).json(error);
        }

        res.locals.statusText = orders;
        return res.status(200).json(orders);
    } catch (e) {
        error = { error: `${e.message}` };
        res.locals.statusText = error;
        return res.status(500).json(error);
    }
};

export const ordersController = {
    createOrder,
    getPurchasesByUser,
    getSellsByUser,
};
