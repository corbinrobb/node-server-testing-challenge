const request = require('supertest');

const server = require('./server.js');
const db = require('./data/dbConfig.js');


describe('server.js', () => {
  beforeEach(async () => {
    await db('data').truncate();
  });

  it('should be using testing evironment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  })


  describe('test GET base root', () => {
    it('should return 200 status', async () => {
      const response = await request(server).get('/');

      expect(response.status).toEqual(200);
    })

    it('should return empty array', async () => {
      const response = await request(server).get('/');

      expect(response.body).toEqual([]);
    })

    it('should return json object', async () => {
      const response = await request(server).get('/');

      expect(response.type).toEqual('application/json');
    })
  })

  describe('test POST base root', () => {
    it('should return 201 status', async () => {
      const response = await request(server).post('/').send({ name: 'test'});

      expect(response.status).toEqual(201);
    })

    it('should return new test object', async () => {
      const response = await request(server).post('/').send({ name: 'test'});

      expect(response.body).toEqual({ id: 1, name: 'test' });
    })
  })

  describe('test DELETE base root', () => {
    it('should return 200 status', async () => {
      await request(server).post('/').send({ name: 'test' });
      const response = await request(server).delete('/1');

      expect(response.status).toEqual(200);
    })

    it('should delete and return json object', async () => {
      await request(server).post('/').send({ name: 'test' });
      const response = await request(server).delete('/1');

      expect(response.body).toEqual({ id: 1, name: 'test' });
    })
  })
})