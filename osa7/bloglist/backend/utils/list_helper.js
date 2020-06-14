const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likes = 0
  blogs.forEach(blog => {
    likes += blog.likes
  });

  return likes
}

const favoriteBlog = (blogs) => {
  let favBlog = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)

  return favBlog
}

const mostBlogs = (blogs) => {
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

  return returnedObj
}

const mostLikes = (blogs) => {
  const result = lodash.groupBy(blogs, 'author')

  let a = ''
  let totalLikes = 0

  for (var prop in result) {
    if(Object.prototype.hasOwnProperty.call(result, prop)) {
      let likes = 0
      let blogArray = result[prop]
      for (var i = 0; i < blogArray.length; i++) {
        likes += blogArray[i].likes
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

  return mostLikesAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}