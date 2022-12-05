const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('book routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });
  it('/books should return a list of books', async () => {
    const res = await request(app).get('/books');
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(8);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      release: expect.any(Number),
      genre: expect.any(String),
    });
  });
  it('/books/1 should return a book detail with authors', async () => {
    const res = await request(app).get('/books/1');
    expect(res.body).toEqual({
      title: expect.any(String),
      release: expect.any(Number),
      authors: expect.any(Array),
    });
  });
  it('/authors should return a list of authors', async () => {
    const res = await request(app).get('/authors');
    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual({
      name: expect.any(String),
      date_of_birth: expect.any(String),
      place_of_birth: expect.any(String),
    });
  });
});
