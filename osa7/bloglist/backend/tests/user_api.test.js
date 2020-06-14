const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

describe('username and password length must be at least 3 chars long', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)  
  })

  test('Username min length = 3 chars', async () => {
    const newObject = {
      username: 'fu',
      name: 'Donald Trump',
      password: 'maga'
    }

    await api
      .post('/api/users')
      .send(newObject)
      .expect(400)
      .catch(error => console.log(error.message))

    const usersAtTheEnd = await helper.usersInDb()
    expect(usersAtTheEnd).toHaveLength(helper.initialUsers.length)
  
    const usernames = usersAtTheEnd.map(u => u.username)
    expect(usernames).not.toContain(newObject.username)
  })

  test('Password min length = 3 chars', async () => {
    const newObject = {
      username: 'obama',
      name: 'Barack Obama',
      password: 'ob'
    }

    await api
      .post('/api/users')
      .send(newObject)
      .expect(400)
    
    const usersAtTheEnd = await helper.usersInDb()
    expect(usersAtTheEnd).toHaveLength(helper.initialUsers.length)
  
    const usernames = usersAtTheEnd.map(u => u.username)
    expect(usernames).not.toContain(newObject.username)
  })
})

afterAll(done => {
  mongoose.connection.close()
  done()
})