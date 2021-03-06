const { ApolloServer, gql, UserInputError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

require('dotenv').config()

let MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.SECRET

mongoose.set('useFindAndModify', false)

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
})

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String]!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    books: [Book]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]!
    ) : Book

    editAuthor(name: String! setBornTo: Int!) : Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args, context) => {
      if(args.genre) {
        const books = await Book.find({}).populate('author')
        
        return books.filter(book => book.genres.includes(args.genre))
      }
      
      return await Book.find({}).populate('author')
    },
    allAuthors: async () => {
      let authors = await Author.find({}).populate('books')

      authors.forEach(a => {
        a.bookCount = a.books.length
      })

      return authors
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      
      let author = await Author.findOne({ name: args.author })      

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      
      if (author) {
        
        try {
          const book = new Book({ ...args, author: author._id })
          await book.save()

          author.books = author.books.concat(book._id)

          await author.save()

          const newBook = await Book.findById(book._id).populate('author')

          return newBook
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      author = new Author({ name: args.author })
      let book = new Book({ ...args, author: author._id })

      try {
        await book.save()

        author.books = author.books.concat(book._id)
        await author.save()
      } catch (error) {
        console.log(error.message);
        
        throw new UserInputError(error.message)
      }

      const newBook = await Book.findById(book._id).populate('author')

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })

      return newBook
    },

    editAuthor: async (root, args, context) => {      
      let author = await Author.findOne({ name: args.name })

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      author.born = args.setBornTo
      
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message)
      }

      return author
    },

    createUser: (root, args, context) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args, context) => {
      const user = await User.findOne({ username: args.username })
      
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id).populate('friends')
      
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})