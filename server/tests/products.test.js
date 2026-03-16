const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('Products API', () => {
    let mongoServer;
    let createdProductId;

    beforeAll(async () => {
        // Disconnect from the existing connection in app.js if any
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    beforeEach(async () => {
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            await collections[key].deleteMany();
        }
    });

    it('GET /api/products should return empty array initially', async () => {
        const res = await request(app).get('/api/products');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(0);
    });

    it('POST /api/products should create a new product', async () => {
        const newProduct = {
            name: 'Tablet',
            description: 'A cool tablet',
            price: 299,
            category: 'Electronics'
        };
        const res = await request(app).post('/api/products').send(newProduct);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.name).toEqual(newProduct.name);
        createdProductId = res.body._id;
    });

    it('GET /api/products/:id should return a specific product', async () => {
        // First create it safely
        const newProduct = { name: 'Tablet', price: 299, category: 'Electronics' };
        const postRes = await request(app).post('/api/products').send(newProduct);
        createdProductId = postRes.body._id;

        const res = await request(app).get(`/api/products/${createdProductId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id', createdProductId);
    });

    it('PUT /api/products/:id should update a product', async () => {
        // First create it safely
        const newProduct = { name: 'Tablet', price: 299, category: 'Electronics' };
        const postRes = await request(app).post('/api/products').send(newProduct);
        createdProductId = postRes.body._id;

        const updatedData = { name: 'Updated Tablet', price: 350 };
        const res = await request(app).put(`/api/products/${createdProductId}`).send(updatedData);
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual(updatedData.name);
        expect(res.body.price).toEqual(updatedData.price);
    });

    it('DELETE /api/products/:id should delete a product', async () => {
        // First create it safely
        const newProduct = { name: 'Tablet', price: 299, category: 'Electronics' };
        const postRes = await request(app).post('/api/products').send(newProduct);
        createdProductId = postRes.body._id;

        const res = await request(app).delete(`/api/products/${createdProductId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id', createdProductId);

        // Confirm deletion
        const checkRes = await request(app).get(`/api/products/${createdProductId}`);
        expect(checkRes.statusCode).toEqual(404);
    });
});
