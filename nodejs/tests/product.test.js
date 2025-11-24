const request = require('supertest');
const app = require('../src/app'); // Adjust the path if necessary
const db = require('../src/config/database'); // Adjust the path if necessary

describe('Product API', () => {
    beforeAll(async () => {
        await db.connect(); // Ensure the database connection is established
    });

    afterAll(async () => {
        await db.disconnect(); // Clean up the database connection
    });

    it('should add a new product', async () => {
        const newProduct = {
            name: 'Test Product',
            price: 100,
            description: 'This is a test product',
        };

        const response = await request(app)
            .post('/api/products')
            .send(newProduct);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(newProduct.name);
    });

    it('should update an existing product', async () => {
        const updatedProduct = {
            name: 'Updated Product',
            price: 150,
            description: 'This is an updated test product',
        };

        const response = await request(app)
            .put('/api/products/1') // Assuming the product ID is 1
            .send(updatedProduct);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(updatedProduct.name);
    });

    it('should delete a product', async () => {
        const response = await request(app)
            .delete('/api/products/1'); // Assuming the product ID is 1

        expect(response.status).toBe(204);
    });

    it('should search for products', async () => {
        const response = await request(app)
            .get('/api/products/search?name=Test Product');

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});