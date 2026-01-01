import request from "supertest"
import mongoose from "mongoose"

import app from "../app.js"
import connectDB from "../Config/db.js"
let idHolder;

beforeAll(async ()=>{
    await  connectDB()
})

afterAll(async ()=> {
    await mongoose.connection.close()
})

describe("Categories:", ()=>{
    it("can get categ by id", async ()=>{
        const res = await request(app).get('/api/categ/6956bd78917aaeff6f40f5db')
        expect(res.statusCode).toBe(200);
    });

    it("can get all categ of a user", async ()=>{
        const res = await request(app).get('/api/categ/for/6956697c4fe4148ff6b6aece')
        expect(res.statusCode).toBe(200);
    });

    it("can create a category", async ()=>{
        const res = await request(app).post('/api/categ').send({name:"test categ" , userID:"6956697c4fe4148ff6b6aece"})
        expect(res.statusCode).toBe(201);
        idHolder = res.body._id
    });

    it("can add notes to a category", async ()=>{
        const res = await request(app).put('/api/categ/add').send({notesID: [{
    "title": "the base note",
    "content": "this note is used for testing",
    "userID": "6956697c4fe4148ff6b6aece",
    "categoryID": null,
    "_id": "6956a095c8eb1332ee5cd63b",
    "createdAt": "2026-01-01T16:28:05.500Z",
    "updatedAt": "2026-01-01T16:28:05.500Z",
    "__v": 0
}], categoryID: idHolder})
        expect(res.statusCode).toBe(200);
    });

    it("can update a category", async ()=>{
        const res = await request(app).put(`/api/categ/${idHolder}`).send({name:"test categ updated"})
        expect(res.statusCode).toBe(200);
    });

    
    it("can clear a category", async ()=>{
        const res = await request(app).put(`/api/categ/${idHolder}/clear`)
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message');
    });

    it("can delete a category", async ()=>{
        const res = await request(app).delete(`/api/categ/${idHolder}`)
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message');
    });
});