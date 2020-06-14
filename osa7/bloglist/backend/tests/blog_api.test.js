const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')

jest.useFakeTimers()

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

describe('when there is initially some blogs saved', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)  
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  describe('id property is defined correctly', () => {
    test('defining id', async () => {
      const response = await api.get('/api/blogs')
  
      expect(response.body[0].id).toBeDefined();
    })
  })
  
  describe('addition of new blog', () => {
    test.only('adding new blog', async () => {
      const newObject = {
        title: "new blog post",
        author: "some dude",
        url: "https://lol.com",
        likes: 199,
        date: new Date(),
        userId: "5eccd75d8ae5fb892c9ffd05"
      }

      const token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5paW5hIiwiaWQiOiI1ZWNiOGZjZDc5MTdhYjgyNTRmZDA1NTAiLCJpYXQiOjE1OTAzOTk0ODZ9.mAJeMS3HM4zkw7dXmUh-UGLub4mzzXx60-5UneQ-hFM'
        
      await api
        .post('/api/blogs')
        .send(newObject)
        .set('Authorization', token)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const blogsAtTheEnd = await helper.blogsInDb()
      expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length + 1)
  
      const titles = blogsAtTheEnd.map(b => b.title)
      expect(titles).toContain('new blog post')
    }, 30000)
  
    test('checking likes', async () => {
      const newObject = {
        title: "new blog",
        author: "some dude",
        url: "https://lol.com",
        date: new Date()
      }

  
      await api
        .post('/api/blogs')
        .send(newObject)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
        const blogsAtTheEnd = await helper.blogsInDb()
        const newBlog = blogsAtTheEnd.find(b => b.title === 'new blog')
  
        expect(newBlog.likes).toEqual(0)
    })
  
    test('checking title and url', async () => {
      const newObject = {
        author: "some dude",
        date: new Date()
      }
  
      await api
        .post('/api/blogs')
        .send(newObject)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })
  })
  
  describe('deleting the blog', () => {
    test('a blog can be deleted', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
  
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
  
      const blogsAtTheEnd = await helper.blogsInDb()
  
      expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length - 1)
  
      const titles = blogsAtTheEnd.map(b => b.title)
  
      expect(titles).not.toContain(blogToDelete.title)
    })
  })
  
  describe('updating the blog', () => {
    test('a blog can be updated', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedBlog = {
        ...blogToUpdate,
        title: 'updated blog'
      }
  
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(204)
  
      const blogsAtTheEnd = await helper.blogsInDb()
    
      const titles = blogsAtTheEnd.map(b => b.title)
  
      expect(titles).not.toContain(blogToUpdate.title)
      expect(titles).toContain(updatedBlog.title)
    })
  })
  
})

afterAll(() => {
  mongoose.connection.close()
})