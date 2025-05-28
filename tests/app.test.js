const request = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('../app');

const dataPath = path.join(__dirname, '../data/users.json');

describe('Integration Test: User creation, login, and transfer', () => {
  test('should create users, login, and transfer balance successfully', async () => {
    // Reset users.json
    fs.writeFileSync(dataPath, '[]');

    // Create user 1
    const res1 = await request(app).post('/users').send({
      name: 'Bright',
      email: 'bright@test.com',
      password: 'bright1'
    });
    expect(res1.statusCode).toBe(201);
    const user1 = res1.body;

    // Create user 2
    const res2 = await request(app).post('/users').send({
      name: 'Boss',
      email: 'boss@test.com',
      password: 'boss1'
    });
    expect(res2.statusCode).toBe(201);
    const user2 = res2.body;

    // Login
    const loginRes = await request(app).post('/login').send({
      email: 'bright@test.com',
      password: 'bright1'
    });
    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body.token).toBeDefined();
    const token = loginRes.body.token;

    // Transfer
    const transferRes = await request(app)
      .post('/transfer')
      .set('Authorization', `Bearer ${token}`)
      .send({
        fromId: user1.id,
        toId: user2.id,
        amount: 50
      });

    expect(transferRes.statusCode).toBe(200);
    expect(transferRes.body).toMatchObject({
      message: 'Transfer successful',
      from: {
        id: user1.id,
        balance: 50
      },
      to: {
        id: user2.id,
        balance: 150
      },
      amount: 50
    });
  });
});
