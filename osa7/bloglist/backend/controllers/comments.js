const commentRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

// ADD NEW COMMENT
commentRouter.post('/', async (request, response) => {
  const { body } = request
  const comment = new Comment({
    comment: body.comment,
    blog: body.blog,
    date: new Date()
  })

  console.log('body', body);
  console.log('comment', comment);
  
  

  const savedComment = await comment.save()

  const blog = await Blog.findById(savedComment.blog)

  blog.comments = blog.comments.concat(savedComment._id)

  await blog.save()

  response
    .status(200)
    .send({ savedComment })
})

module.exports = commentRouter