const lodash = require('lodash')
const bcrypt = require('bcrypt')

const blogs = [
  { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 },
  { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 },
  { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 },
  { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 },
  { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 },
  { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
]

const result = lodash.groupBy(blogs, 'author')

let len = 0
let auth = ''

for (var prop in result) {
  if(Object.prototype.hasOwnProperty.call(result, prop)) {
    if (result[prop].length > len) {
      len = result[prop].length
      auth = prop
    }
  }
}
const returnedObj = {
  author: auth,
  blogs: len
}

console.log(returnedObj)

// Most Likes

let a = ''
let totalLikes = 0

for (var prop in result) {
  if(Object.prototype.hasOwnProperty.call(result, prop)) {
    let likes = 0
    let blogs = result[prop]
    for (var i = 0; i < blogs.length; i++) {
      likes += blogs[i].likes
    }
    if (likes > totalLikes) {
      totalLikes = likes
      a = prop
    }
  }
}

const mostLikesAuthor = {
  author: a,
  likes: totalLikes
}

console.log(mostLikesAuthor)

const pw = async () => {
  let pw1 = await bcrypt.hash('samson', 10)
  let pw2 = await bcrypt.hash('niina', 10)
  let pw3 = await bcrypt.hash('donald', 10)

  console.log(pw1)
  console.log(pw2)
  console.log(pw3)
}

pw()
