const request = require('supertest');
const app = require('../src/app');

describe('Products API', () => {
    let createdProductId;

    it('GET /api/products should return all products', async () => {
        const res = await request(app).get('/api/products');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('POST /api/products should create a new product', async () => {
        const newProduct = {
            name: 'Tablet',
            price: 299
        };
        const res = await request(app).post('/api/products').send(newProduct);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toEqual(newProduct.name);
        createdProductId = res.body.id;
    });

    it('GET /api/products/:id should return a specific product', async () => {
        const res = await request(app).get(`/api/products/${createdProductId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', createdProductId);
    });

    it('PUT /api/products/:id should update a product', async () => {
        const updatedData = {
            name: 'Updated Tablet',
            price: 350
        };
        const res = await request(app).put(`/api/products/${createdProductId}`).send(updatedData);
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual(updatedData.name);
        expect(res.body.price).toEqual(updatedData.price);
    });

    it('DELETE /api/products/:id should delete a product', async () => {
        const res = await request(app).delete(`/api/products/${createdProductId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', createdProductId);

        // Confirm deletion
        const checkRes = await request(app).get(`/api/products/${createdProductId}`);
        expect(checkRes.statusCode).toEqual(404);
    });
});
