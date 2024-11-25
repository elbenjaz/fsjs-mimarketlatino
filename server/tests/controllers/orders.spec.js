// supertest
import request from "supertest";

// app
import app from "../../server.js";

// utils
import { generateToken } from "../utils/data.js";

describe("Mi Market Latino", () => {
    it("GET /orders/purchases : returns code 200 and array", async () => {
        const response = await request(app)
            .get(`/api/v1/orders/purchases`)
            .set("Authorization", `Bearer: ${generateToken()}`)
            .send();
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it("GET /orders/sells : returns code 200 and array", async () => {
        const response = await request(app)
            .get(`/api/v1/orders/sells`)
            .set("Authorization", `Bearer: ${generateToken()}`)
            .send();
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });    
});
