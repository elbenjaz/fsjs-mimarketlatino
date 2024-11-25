// supertest
import request from "supertest";

// app
import app from "../../server.js";

// utils
import { credentialsValid, credentialsInvalid, userNew, userEdit, generateToken } from "../utils/data.js";

describe("Mi Market Latino", () => {
    it("GET /users : returns code 200 and object", async () => {
        const response = await request(app)
            .get(`/api/v1/users/${credentialsValid.id_user}`)
            .set("Authorization", `Bearer: ${generateToken()}`)
            .send();
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("POST /users : returns code 201 and object", async () => {
        const response = await request(app)
            .post(`/api/v1/users/`)
            .send(userNew);
        
        expect(response.statusCode).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("PUT /users : returns code 200 and object", async () => {
        const response = await request(app)
            .put(`/api/v1/users/${credentialsValid.id_user}`)
            .set("Authorization", `Bearer: ${generateToken()}`)
            .send(userEdit);
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("POST /login with valid credentials : returns code 200 and object", async () => {
        const response = await request(app)
            .post("/api/v1/login")
            .send(credentialsValid);
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("POST /login with invalid credentials : returns code 400", async () => {
        const response = await request(app)
            .post("/api/v1/login")
            .send(credentialsInvalid);
        
        expect(response.statusCode).toBe(400);
    });
});
