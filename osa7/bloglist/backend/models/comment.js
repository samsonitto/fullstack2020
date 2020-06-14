const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
    minlength: 3,
  },
  date: { type: Date, required: true },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  },
})

commentSchema.plugin(uniqueValidator)

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Comment', commentSchema)
