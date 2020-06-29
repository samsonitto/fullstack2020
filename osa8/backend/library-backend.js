const { ApolloServer, gql, UserInputError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { v1: uuid } = require('uuid')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { findById } = require('./models/book')

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
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args, context) => {
      /* const filteredAuthor = args.author ? books.filter(b => b.author === args.author) : books
      const filteredGenre = args.genre ? filteredAuthor.filter(fa => fa.genres.find(g => g.toLocaleLowerCase() === args.genre.toLocaleLowerCase())) : filteredAuthor

      return filteredGenre */
      return Book.find({}).populate('author')
    },
    allAuthors: () => {
      /* return authors.map(a => {
        return {...a, bookCount: books.filter(b => b.author === a.name).length}
      }) */
      return Author.find({}).populate('books')
    },
    me: (root, args, context) => {
      console.log(context)
      
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

          author = author.books.concat(book._id)

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

      return newBook
    },

    editAuthor: async (root, args, context) => {      
      let author = await Author.findOne({ name: args.name })

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      author.born = args.setBornTo

      console.log('author', author)

      
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

      console.log('user', user)
      console.log('pw', args.password)
      
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    console.log('req', req.headers.authorization);
    
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id).populate('friends')
      console.log('currentUser', currentUser);
      
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})