import { favoriteModel } from "../models/favoriteModel.js";
import { productModel } from "../models/productModel.js";

// method: POST
const addFavorite = async (req, res) => {
    let error;

    try {
        const { id_user } = req.auth;
        const { id_product } = req.body;

        const product = await productModel.getProduct({ id_product });

        if (!product) {
            error = { error: "Product not found" };
            res.locals.statusText = error;
            return res.status(404).json(error);
        }

        const favoriteExists = await favoriteModel.getFavorite({ id_user, id_product });

        if (favoriteExists) {
            error = { error: "Favorite already exists" };
            res.locals.statusText = error;
            return res.status(400).json(error);
        }
        
        const favorite = await favoriteModel.addFavorite({ id_user, id_product });
        res.locals.statusText = favorite;
        return res.status(201).json(favorite);
    } catch (e) {
        error = { error: `${e.message}` };
        res.locals.statusText = error;
        return res.status(500).json(error);
    }
};

// method: GET
const getFavorites = async (req, res) => {
    let error;

    try {
        const { id_user } = req.auth;
        const favorites = await favoriteModel.getFavorites({ id_user });
        res.locals.statusText = favorites;
        return res.status(200).json(favorites);
    } catch (e) {
        error = { error: `${e.message}` };
        res.locals.statusText = error;
        return res.status(500).json(error);
    }
};

// method: DELETE
const deleteFavorite = async (req, res) => {
    let error;

    try {
        const { id_user } = req.auth;
        const { id_product } = req.params;

        const favoriteExists = await favoriteModel.getFavorite({ id_user, id_product });

        if (!favoriteExists) {
            error = { error: "Favorite does not exist" };
            res.locals.statusText = error;
            return res.status(404).json(error);
        }

        const deleteFavorite = await favoriteModel.deleteFavorite({ id_user, id_product });
        res.locals.statusText = deleteFavorite;
        return res.status(200).json(deleteFavorite);
    } catch (e) {
        error = { error: `${e.message}` };
        res.locals.statusText = error;
        return res.status(500).json(error);
    }
};

export const favoritesController = {
    addFavorite,
    getFavorites,
    deleteFavorite,
};
