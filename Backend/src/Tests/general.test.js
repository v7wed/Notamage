import request from "supertest";
import app from "../app.js";
import connectDB from "../Config/db.js";
import mongoose from "mongoose";

beforeAll(async () => {
    await connectDB();
});


afterAll(async () => {
    await mongoose.connection.close();
});

describe("Server: ", () => {
    it("health check", async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toBe(200);
    });

    it("404 for non-existent routes", async () => {
        const res = await request(app).get('/api/nonexistent');
        expect(res.statusCode).toBe(404);
    });

});