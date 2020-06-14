const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  { title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, date: new Date() },
  { title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, date: new Date() },
  { title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, date: new Date() },
  { title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, date: new Date() },
  { title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, date: new Date() },
  { title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, date: new Date() }
]

const initialUsers = [
  { username: 'samson', name: 'Samson Azizyan', passwordHash: '$2b$10$bG7CGo2wzG6uv.s.UbozjeOPJSmZ8DlGBoprBA4z0vsirIdNnxmjS' },
  { username: 'nipsunapsu', name: 'Niina Mattola', passwordHash: '$2b$10$JKMQCd4Fzvd4TvRCWnjkXuN/hgnPuLiBUP6/HAOQbRQDrjmhgnAyq' },
  { username: 'maga', name: 'Donald Trump', passwordHash: '$2b$10$hK/P6jRrxplw8GHflryG4eXpBPXR49U3JsO6tUPI4NQb0I5W4H39a' },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovesoon', author: 'Remove Removersson', url: 'https://remove.com', likes: 0 })

  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb
}