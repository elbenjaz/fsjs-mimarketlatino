// supertest
import request from "supertest";

// app
import app from "../../server.js";

// utils
import { generateToken, productValid, productInvalid, productNew } from "../utils/data.js";

describe('Products API', () => {

    describe('GET /products', () => {
        it('Should return all products and have a status code of 200', async () => {
            await request(app)
                .get('/api/v1/products')
                .expect(200)
                .then(response => {
                    expect(response.body).toBeInstanceOf(Array);
                });
        });
    });

    describe('GET /products/:id', () => {
        it('Should return a product by id and have a status code of 200', async () => {
            await request(app)
                .get(`/api/v1/products/${productValid.id_product}`)
                .expect(200)
                .then(response => {
                    expect(response.body).toHaveProperty('id_product');
                });
        });

        it('Should return a 404 status code if the product does not exist', async () => {
            await request(app)
                .get(`/api/v1/products/${productInvalid.id_product}`)
                .expect(404);
        });
    });

    let createdProductId; // variable to store the ID of the created product

    describe('POST /products', () => {
        it('Should create a product and return a status code of 201', async () => {
            const response = await request(app)
                .post('/api/v1/products')
                .set('Authorization', `Bearer ${generateToken()}`)
                .send(productNew)
                .expect(201);

            // save product id for later use
            createdProductId = response.body.id_product;
        });

        it('Should return a 401 status code if the user is not authenticated', async () => {
            await request(app)
                .post('/api/v1/products')
                .send(productNew)
                .expect(401);
        });
    });

    describe('DELETE /products/:id', () => {
        it('Should delete a product and return a status code of 200', async () => {
            if (!createdProductId) {
                throw new Error('No product ID defined for deletion test');
            }

            await request(app)
                .delete(`/api/v1/products/${createdProductId}`)
                .set('Authorization', `Bearer ${generateToken()}`)
                .expect(200);
        });

        it('Should return a 401 status code if the user is not authenticated', async () => {
            await request(app)
                .delete(`/api/v1/products/${productValid.id_product}`)
                .expect(401);
        });

        it('Should return a 404 status code if the product does not exist', async () => {
            await request(app)
                .delete(`/api/v1/products/${productInvalid.id_product}`)
                .set('Authorization', `Bearer ${generateToken()}`)
                .expect(404);
        });
    });
});