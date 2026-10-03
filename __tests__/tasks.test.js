const request = require('supertest');
const app = require('../index');

describe('GET /api/v1/tasks', () => {
  it('rejects a request with no token', async () => {
    const res = await request(app).get('/api/v1/tasks');
    expect(res.statusCode).toBe(401);
  });
});

describe('POST /api/v1/auth/login', () => {
  it('rejects an incorrect password', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({ email: 'trainee1@test.com', password: 'wrongpassword' });
    expect(res.statusCode).toBe(401);
  });

  it('accepts correct credentials and returns a token', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({ email: 'trainee1@test.com', password: 'password123' });
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty('accessToken');
  });
});
