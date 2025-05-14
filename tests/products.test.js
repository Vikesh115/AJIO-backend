const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const productRoutes = require('../routes/products');
const Product = require('../models/Product');

let app;
let mongoServer;
let insertedProducts = []; // ✅ Declare at top-level for test access


beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    app = express();
    app.use(express.json());
    app.use('/api/products', productRoutes);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    await Product.deleteMany();

    insertedProducts = await Product.insertMany([
        { id: 1, title: 'Product 1', category: 'electronics' },
        { id: 2, title: 'Product 2', category: 'clothing' },
        { id: 3, title: 'Product 3', category: 'electronics' }
    ]);

});


describe('GET /api/products', () => {
    it('should return all products', async () => {
        const res = await request(app).get('/api/products');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(3);
    });
});

describe('GET /api/products/:id', () => {
    it('should return a single product by id', async () => {
        const productId = insertedProducts[0].id;
        const res = await request(app).get(`/api/products/${productId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe('Product 1');
    });

    it('should return 404 for non-existing product', async () => {
        const res = await request(app).get(`/api/products/999`);
        expect(res.statusCode).toBe(404);
    });


});

describe('GET /api/products/category/:category', () => {
    it('should return products by category', async () => {
        const res = await request(app).get('/api/products/category/electronics');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(2);
    });
});

describe('GET /api/products/categories/all', () => {
    it('should return distinct categories', async () => {
        const res = await request(app).get('/api/products/categories/all');
        expect(res.statusCode).toBe(200);
        expect(res.body).toContain('electronics');
        expect(res.body).toContain('clothing');
    });
});
