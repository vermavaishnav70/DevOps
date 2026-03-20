process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('Stats API', () => {
    let mongoServer;

    beforeAll(async () => {
        // Disconnect from the existing connection in app.js if any
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
    }, 60000);

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

    it('GET /api/stats should return a default stat object initially', async () => {
        const res = await request(app).get('/api/stats');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.vitality).toBe(85);
        expect(res.body.focus).toBe(92);
        expect(res.body.metabolicRate).toBe('1,840 kcal active');
        expect(res.body.sleepQuality).toBe('Excellent');
        expect(res.body.deepWorkStreak).toBe(4);
        expect(res.body.consciousnessLevel).toBe('Lucid');
    });

    it('POST /api/stats should create or update the single stat object', async () => {
        const updateData = {
            vitality: 90,
            focus: 95
        };
        const res = await request(app).post('/api/stats').send(updateData);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.vitality).toEqual(90);
        expect(res.body.focus).toEqual(95);
        expect(res.body.consciousnessLevel).toBe('Lucid'); // Default value should remain
    });
});
