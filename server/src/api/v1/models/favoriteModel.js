import pool from "../../../../config/database/connection.js";

// get favorite
const getFavorite = async ({ id_user, id_product }) => {
    if (!id_user || !id_product) {
        throw new Error("Required parameters are missing.");
    }

    const favorite = await getFavorites({ id_user, id_product });

    return favorite ? favorite[0] : false;
};

// get favorites
const getFavorites = async ({ id_user, id_product }) => {
    try {
        const where = [];
        const values = [];

        let sql = `
            SELECT 
            favorites.id_user,
            favorites.id_product
            FROM
                favorites`;

        if (id_user) {
            where.push(`(favorites.id_user = $${values.length + 1})`);
            values.push(id_user);
        }

        if (id_product) {
            where.push(`(favorites.id_product = $${values.length + 1})`);
            values.push(id_product);
        }

        if (where.length) {
            sql += ` WHERE ${where.join(" AND ")}`;
        }

        const favorites = await pool.query(sql, values);

        return favorites.rows;
    } catch (error) {
        throw new Error(error.message);
    }
};

// add favorite
const addFavorite = async ({ id_user, id_product }) => {
    if (!id_user || !id_product) {
        throw new Error("Required parameters are missing.");
    }

    const SQLquery = {
        text: "INSERT INTO favorites (id_user, id_product) VALUES ($1, $2) RETURNING *",
        values: [id_user, id_product],
    };
    try {
        const result = await pool.query(SQLquery);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

// remove favorite
const deleteFavorite = async ({ id_user, id_product }) => {
    if (!id_user || !id_product) {
        throw new Error("Required parameters are missing.");
    }

    const SQLquery = {
        text: "DELETE FROM favorites WHERE id_user =$1 AND id_product = $2 RETURNING *",
        values: [id_user, id_product],
    };
    try {
        const result = await pool.query(SQLquery);
        return result.rows[0];
    } catch (error) {
        throw new Error("Error updating favorite: " + error.message);
    }
};

export const favoriteModel = { getFavorite, getFavorites, addFavorite, deleteFavorite };
