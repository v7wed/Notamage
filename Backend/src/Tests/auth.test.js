import request from "supertest"
import mongoose from "mongoose"

import app from "../app.js"
import connectDB from "../Config/db.js"


let tokenHolder , idHolder;

beforeAll(async ()=>{
    await  connectDB()
})

afterAll(async ()=> {
    await mongoose.connection.close()
})

describe("Users:", ()=>{
    it("can register a new user", async ()=>{
        const res = await request(app)
            .post('/api/users/reg')
            .send({
                Name: "test user",
                Password: "123qweasd",
                Email: "tarnishedTester@notamage.com"
            });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('token');
        tokenHolder = res.body.token;
    });

    it("can inquire about current user after registration", async ()=>{
        const res = await request(app)
            .get('/api/users/me')
            .set('Authorization', `Bearer ${tokenHolder}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.Email).toBe("tarnishedTester@notamage.com");
    });

    it("can sign in as a user", async ()=>{
        const res = await request(app)
            .post('/api/users/signin')
            .send({
                Password: "123qweasd",
                Email: "tarnishedTester@notamage.com"
            });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
        tokenHolder = res.body.token;
    });

    it("can inquire about current user after sign in", async ()=>{
        const res = await request(app)
            .get('/api/users/me')
            .set('Authorization', `Bearer ${tokenHolder}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.Email).toBe("tarnishedTester@notamage.com");
        idHolder = res.body._id
    });

    it("can update a user's email", async ()=>{
        const res = await request(app)
            .put('/api/users/email')
            .set('Authorization', `Bearer ${tokenHolder}`)
            .send({Email: "goodTester@notamage.com"});
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.Email).toBe("goodTester@notamage.com");
        
    });
    it("can update a user's password", async ()=>{
        const res = await request(app)
            .put('/api/users/password')
            .set('Authorization', `Bearer ${tokenHolder}`)
            .send({oldPassword: "123qweasd" , newPassword: "asdf1234"});
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message');
    });

    it("deleted test account", async ()=>{
        const res = await request(app).delete(`/api/users/${idHolder}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('Email');
        expect(res.body.Email).toBe('goodTester@notamage.com');
    });
});