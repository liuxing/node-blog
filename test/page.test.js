const app = require('../index')
const server = app.listen()
const request = require('supertest').agent(server)

afterEach(() => {
  server.close()
})

test('should GET /', async () => {
  const res = await request.get('/')
  expect(res.status).toEqual(200)
})

test('should GET /about', async () => {
  const res = await request.get('/about')
  expect(res.status).toEqual(200)
})
