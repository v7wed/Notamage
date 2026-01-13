import request from "supertest";
import app from "../app.js";
import connectDB from "../Config/db.js";
import mongoose from "mongoose";

let identifier;

beforeAll(async () => {
    await connectDB();
});


afterAll(async () => {
    await mongoose.connection.close();
});

describe("Notes: ", () => {
    it("a note can be created", async () => {
        const res = await request(app)
            .post('/api/notes/')
            .send({
                title: "testing note",
                content: "this note will be deleted soon",
                userID: "6956697c4fe4148ff6b6aece",
                categoryID: null
            });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.title).toBe("testing note");
        identifier = res.body._id;
    });

    it("a note can be queried by ID ", async () => {
        const res = await request(app).get(`/api/notes/${identifier}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('title');
    });

    it("a note can be updated by ID ", async () => {
        const res = await request(app)
            .put(`/api/notes/${identifier}`)
            .send({
                title: "testing note updated",
                content: "this note will be deleted very soon"
            });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.title).toBe("testing note updated");
    });

    it("a note can be deleted by ID ", async () => {
        const res = await request(app).delete(`/api/notes/${identifier}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body._id).toBe(identifier);
    });
});