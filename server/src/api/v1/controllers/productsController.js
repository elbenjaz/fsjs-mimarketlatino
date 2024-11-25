// model
import { productModel } from "../models/productModel.js";

// method: GET
const getProducts = async (req, res) => {
    let error;

    try {
        const products = await productModel.getProducts({});
        //price as a Number
        products.map(product => product.price = Number(product.price));

        res.locals.statusText = products;
        return res.status(200).json(products);
    } catch (e) {
        error = { error: `${e.message}` };
        res.locals.statusText = error;
        return res.status(500).json(error);
    }
};

// method: GET
const getProduct = async (req, res) => {
    let error;

    try {
        const { id_product } = req.params;
        const product = await productModel.getProduct({ id_product });

        if (!product) {
            error = { error: "Product not found" };
            res.locals.statusText = error;
            return res.status(404).json(error);
        }

        //price as a Number
        product.price = Number(product.price);

        res.locals.statusText = product;        
        return res.status(200).json(product);
    } catch (e) {
        error = { error: `${e.message}` };
        res.locals.statusText = error;
        return res.status(500).json(error);
    }
};

// method: POST
const createProduct = async (req, res) => {
    let error;

    try {
        // id_user from decoded JWT
        const id_user = req.auth.id_user;

        // include id_user in product object to create product
        const productData = { ...req.body, id_user }; // add id_user from token to product data

        const product = await productModel.createProduct(productData);

        //price as a Number
        product.price = Number(product.price);

        res.locals.statusText = product;
        return res.status(201).json(product);
    } catch (e) {
        error = { error: `${e.message}` };
        res.locals.statusText = error;
        return res.status(500).json(error);
    }
};

// method: DELETE
const deleteProduct = async (req, res) => {
    let error;

    try {
        const { id_product } = req.params;
        const product = await productModel.deleteProduct(id_product);

        if (!product) {
            error = { message: "Product not found" };
            res.locals.statusText = error;
            return res.status(404).json(error);
        }

        //price as a Number
        product.price = Number(product.price);

        res.locals.statusText = product;
        res.status(200).json(product);
    } catch (e) {
        error = { error: `${e.message}` };
        res.locals.statusText = error;
        return res.status(500).json(error);
    }
};

export const productsController = {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
};
