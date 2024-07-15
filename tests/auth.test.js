const request = require('supertest');
const app = require('../app');
const syncDatabase = require('./database');

beforeAll(async () => {
  await syncDatabase.sync()

  await syncDatabase.seed()
})

afterAll(async () => {
  await syncDatabase.clean()
});

describe('Auth API', () => {
  let requestRegister = {
    "name": "testregister",
    "email": "testregister@yopmail.com",
    "password": "testtest"
  }

  test('check server active', () => {
    return request(app)
            .get('/ping')
            .expect(200)
            .then((res) => {
              expect(res.status).toBe(200);
            })
  })

  test('Should register a new user', () => {

    return request(app)
            .post('/auth/register')
            .send(requestRegister)
            .expect(201)
            .then(({status, body}) => {
              expect(status).toBe(201);
              expect(body).toBeInstanceOf(Object);
              expect(body.data).toHaveProperty('email', requestRegister.email);
            })
  })

  test('Should not register a new user with existing email', () => {
    return request(app)
            .post('/auth/register')
            .send(requestRegister)
            .expect(400)
            .then(({status, body}) => {
              expect(status).toBe(400);
              expect(body).toBeInstanceOf(Object);
              expect(body.code).toBe(400);
              expect(body.message).toBe('BAD_REQUEST');
              expect(body.errors).toBeInstanceOf(Object);
              expect(body.errors.email).toContain('email has already been used');
            })
  })
});