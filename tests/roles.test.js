const request = require('supertest');
const app = require('../app');
const syncDatabase = require('./database');
const { generateJWT } = require("../helpers/jwt");
const { User, Role } = require('../models/index');

beforeAll(async () => {
  await syncDatabase.sync()

  await syncDatabase.seed()
})

afterAll(async () => {
  await syncDatabase.clean()
});

describe('Roles API', () => {
  let prefix = '/api/v1/roles'
  const roles = require('../seeders/data/roles.json');
  
  test('Should not get all roles without access token', () => {
    return request(app)
            .get(prefix)
            .expect(401)
            .then(({status, body}) => {
              expect(status).toBe(401);
              expect(body).toBeInstanceOf(Object);
              expect(body.code).toBe(401);
              expect(body.message).toBe('NOT_AUTHORIZED');
            })
  })

  test('Should get all roles', async () => {
    const admin = await User.findOne({
      where: {
        email: 'admin@yopmail.com'
      },
      include: {
        model: Role,
      }
    });

    const token = generateJWT(admin);
    return request(app)
            .get(prefix)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then(({status, body}) => {
              expect(status).toBe(200);
              expect(body).toBeInstanceOf(Object);
              expect(body.data).toBeInstanceOf(Array);
            })
  })
})