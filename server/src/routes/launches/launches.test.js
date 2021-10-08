const request = require('supertest')

const { app } = require('../../app')

describe('GET /launches', () => {
  test('Should respond with 200 success', async () => {
    await request(app)
      .get('/launches')
      .expect('Content-Type', /json/)
      .expect(200)
  })
})

describe('POST /launch', () => {
  test('Should respond with 201 created', async () => {
    const newLaunch = {
      mission: 'USS Enterprise',
      rocket: 'NCC 1701-D',
      target: 'Kepler-186 f',
      launchDate: 'January 4, 2028',
    }

    const newLaunchWithoutDate = {
      mission: 'USS Enterprise',
      rocket: 'NCC 1701-D',
      target: 'Kepler-186 f',
    }

    const response = await request(app)
      .post('/launches')
      .send(newLaunch)
      .expect('Content-Type', /json/)
      .expect(201)
    
    const requestDate = new Date(newLaunch.launchDate).valueOf()
    const responseDate = new Date(response.body.launchDate).valueOf()

    expect(response.body).toMatchObject(newLaunchWithoutDate)
    expect(requestDate).toBe(responseDate)
  })

  test('Should catch missing required properties', async () => {
    const newLaunchWithoutDate = {
      mission: 'USS Enterprise',
      rocket: 'NCC 1701-D',
      target: 'Kepler-186 f',
    }

    const response = await request(app)
      .post('/launches')
      .send(newLaunchWithoutDate)
      .expect('Content-Type', /json/)
      .expect(400)

    expect(response.body).toStrictEqual({
      error: 'Missing required launch property',
    })
  })

  test('Should catch invalid dates', async () => {
    const newLaunchWithInvalidDate = {
      mission: 'USS Enterprise',
      rocket: 'NCC 1701-D',
      target: 'Kepler-186 f',
      launchDate: 'foo',
    }

    const response = await request(app)
      .post('/launches')
      .send(newLaunchWithInvalidDate)
      .expect('Content-Type', /json/)
      .expect(400)

    expect(response.body).toStrictEqual({
      error: 'Invalid launch date',
    })
  })
})