import pool from "../../../../config/database/connection.js";

// get product
const getProduct = async ({ id_product }) => {
    if (!id_product) {
        throw new Error("Required parameters are missing.");
    }

    const product = await getProducts({ id_product });

    return product ? product[0] : false;
};

// get products
const getProducts = async ({ id_product }) => {
    try {
        const where = [];
        const values = [];

        let sql = `
          SELECT
            products.id_product,
            products.id_user,
            products.name,
            products.price,
            products.description,
            products.image_url,
            products.category,
            products.date_add,
            CONCAT(users.firstname, ' ', users.lastname) AS seller_name
          FROM products
          INNER JOIN users ON products.id_user = users.id_user`;

        if (id_product) {
            if (Array.isArray(id_product)) {
                const id_products = id_product.map((id) => {
                    const where = `$${values.length + 1}`;
                    values.push(id);
                    return where;
                });
                where.push(`(products.id_product IN (${id_products.join(', ')}))`);
            } else {
                where.push(`(products.id_product = $${values.length + 1})`);
                values.push(id_product);
            }
        }

        if (where.length) {
            sql += ` WHERE ${where.join(" AND ")}`;
        }
        
        const products = await pool.query(sql, values);

        return products.rows;
    } catch (error) {
        throw new Error(error.message);
    }
};

// create product
const createProduct = async (product) => {
    try {
        const { id_user, name, price, description, image_url, category } = product;
        const { rows } = await pool.query(`
            INSERT INTO products 
            (id_user, name, price, description, image_url, category, date_add) 
            VALUES
            ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP) 
            RETURNING *`,
            [id_user, name, price, description, image_url, category]);

        return rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

// delete product
const deleteProduct = async (id_product) => {
    try {
        const { rows } = await pool.query('DELETE FROM products WHERE id_product = $1 RETURNING *', [id_product]);
        return rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

export const productModel = { getProducts, getProduct, createProduct, deleteProduct };
