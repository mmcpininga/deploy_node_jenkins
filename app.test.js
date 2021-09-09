const { describe, afterAll } = require('jest-circus')
const request = require('supertest')
const app = require('./app')

describe('Api testing', () => {
  afterAll(done => {
    app.close(done)
  })

  it('should get hello message. Aqui deve aparecer a mensagem Hello', done => {
    const expectedResponse = {
      message: 'Hello World from Docker!'
    }

    request(app).get('/').expect(200).end((err, res) => {
      expect(res.body).toEqual(expectedResponse)
      done()
    })
  })
})