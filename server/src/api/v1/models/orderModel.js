import pool from "../../../../config/database/connection.js";

// create order and order detail
const createOrder = async (orderData) => {
    const { id_user, total_price, products } = orderData;
    if (total_price <= 0) {
        throw new Error("El monto total debe ser mayor que cero.");
    }
    if (!Array.isArray(products) || products.length === 0) {
        throw new Error("La orden debe contener al menos un producto.");
    }
    products.forEach((product) => {
        if (product.product_quantity <= 0) {
            throw new Error(
                "La cantidad de cada producto debe ser mayor que cero."
            );
        }
    });

    try {
        await pool.query("BEGIN");
        // create order and obtain id_order and date
        const createOrder = await pool.query(
            "INSERT INTO orders (id_user, total_price) VALUES ($1, $2) RETURNING id_order, purchase_date",
            [id_user, total_price]
        );
        const { id_order, purchase_date } = createOrder.rows[0];

        // insert product to order_details with id_order
        for (const product of products) {
            const { id_product, unit_price, product_quantity } = product;
            await pool.query(
                "INSERT INTO order_details (id_order, id_product, unit_price, product_quantity) VALUES ($1, $2, $3, $4)",
                [id_order, id_product, unit_price, product_quantity]
            );
        }
        await pool.query("COMMIT");
        return { id_order, id_user, total_price, products, purchase_date };
    } catch (error) {
        await pool.query("ROLLBACK"); // without details, undo everything
        throw error;
    }
};

// get purchases by user
const getPurchases = async (id) => {
  try {
      const where = [];
      const values = [];
      let sql = `
          SELECT
              orders.id_order,
              orders.total_price,
              orders.purchase_date,
              json_agg(
                  json_build_object(
                      'id_product', products.id_product,
                      'name', products.name,
                      'image_url', products.image_url,
                      'unit_price', order_details.unit_price,
                      'product_quantity', order_details.product_quantity
                  )
              ) AS products_details
          FROM orders
          INNER JOIN order_details ON orders.id_order = order_details.id_order
          INNER JOIN products ON order_details.id_product = products.id_product`;
      if (id) {
          where.push(`(orders.id_user = $${values.length + 1})`);
          values.push(id);
      }

      if (where.length > 0) {
          sql += ` WHERE ${where.join(" AND ")}`;
      }

      sql += ` GROUP BY orders.id_order, orders.total_price, orders.purchase_date`;

      sql += ` ORDER BY orders.id_order DESC`;

      const purchases = await pool.query(sql, values);
      return purchases.rows;
  } catch (error) {
      throw new Error(error.message);
  }
}

// get user sells with the id of the user that sells the product
const getSells = async (id) => {
  try {
      const where = [];
      const values = [];
      let sql = `
          SELECT 
              orders.id_order,
              orders.purchase_date,
              json_agg(
                  json_build_object(
                      'id_product', products.id_product,
                      'name', products.name,
                      'image_url', products.image_url,
                      'unit_price', order_details.unit_price,
                      'product_quantity', order_details.product_quantity
                  )
              ) AS products_details
          FROM orders
          INNER JOIN order_details ON orders.id_order = order_details.id_order 
          INNER JOIN products ON order_details.id_product = products.id_product`;
      if (id) {
          where.push(`(products.id_user = $${values.length + 1})`);
          values.push(id);
      }

      if (where.length > 0) {
          sql += ` WHERE ${where.join(" AND ")}`;
      }

      sql += ` GROUP BY orders.id_order, orders.purchase_date`;

      sql += ` ORDER BY orders.id_order DESC`;

      const sells = await pool.query(sql, values);
      return sells.rows;
  } catch (error) {
      throw new Error(error.message);
  }
};

export const orderModel = { createOrder, getPurchases, getSells };
