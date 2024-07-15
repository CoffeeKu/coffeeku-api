const request = require('supertest');
const app = require('../app');
const syncDatabase = require('./database');
const { generateJWT } = require("../helpers/jwt");

beforeAll(async () => {
  await syncDatabase.sync()

  await syncDatabase.seed()
})

afterAll(async () => {
  await syncDatabase.clean()
});

describe('Roles API', () => {
  let prefix = '/roles'
  let admin = syncDatabase.getAdmin()
  let accessToken = generateJWT({
    id: admin.id,
    email: admin.email,
  });
  const roles = require('../seeders/data/roles.json');
  
  test('check server active', () => {
    return request(app)
            .get('/ping')
            .expect(200)
            .then((res) => {
              expect(res.status).toBe(200);
            })
  })

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

  test('Should not get all roles with access token not valid', () => {
    return request(app)
            .get(prefix)
            .set('Authorization', `Bearer ${accessToken}123`)
            .expect(401)
            .then(({status, body}) => {
              expect(status).toBe(401);
              expect(body).toBeInstanceOf(Object);
              expect(body.code).toBe(401);
              expect(body.message).toBe('NOT_AUTHORIZED');
            })
  })

  test('Should get all roles', () => {
    return request(app)
            .get(prefix)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200)
            .then(({status, body}) => {
              expect(status).toBe(200);
              expect(body).toBeInstanceOf(Object);
              expect(body.data).toBeInstanceOf(Array);
              expect(body.meta.next).toBe(null);
              expect(body.meta.previous).toBe(null);
              expect(body.meta.page).toBe(1);
              expect(body.meta.total).toBe(roles.length);
              expect(body.meta.limit).toBe(10);
              expect(body.meta.totalPages).toBe(1);
            })
  })
  test('Should get roles with limit 1', () => {
    return request(app)
            .get(prefix + '?limit=1')
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200)
            .then(({status, body}) => {
              expect(status).toBe(200);
              expect(body).toBeInstanceOf(Object);
              expect(body.data).toBeInstanceOf(Array);
              expect(body.meta.next).toBe(2);
              expect(body.meta.previous).toBe(null);
              expect(body.meta.page).toBe(1);
              expect(body.meta.total).toBe(roles.length);
              expect(body.meta.limit).toBe(1);
              expect(body.meta.totalPages).toBe(roles.length);
            })
  })
  
  test('Should get roles with name filter', () => {
    let filter = "admin"
    
    return request(app)
            .get(prefix + `?filter[name]=${filter}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200)
            .then(({status, body}) => {
              expect(status).toBe(200);
              expect(body).toBeInstanceOf(Object);
              expect(body.data).toBeInstanceOf(Array);
              expect(body.meta.next).toBe(null);
              expect(body.meta.previous).toBe(null);
              expect(body.meta.page).toBe(1);
              expect(body.meta.total).toBe(roles.filter(r => r.name === filter).length);
              expect(body.meta.limit).toBe(10);
              expect(body.meta.totalPages).toBe(1);
            })
  })
})