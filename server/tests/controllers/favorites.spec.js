// supertest
import request from "supertest";

// app
import app from "../../server.js";

// utils
import { credentialsValid, productValid, generateToken } from "../utils/data.js";

describe("Mi Market Latino", () => {
    it("GET /favorites/:id_user : returns code 200 and array", async () => {
        const response = await request(app)
            .get(`/api/v1/favorites/${credentialsValid.id_user}`)
            .set("Authorization", `Bearer: ${generateToken()}`)
            .send();
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});
