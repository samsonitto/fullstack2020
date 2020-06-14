const http = require('http')
const app = require('./app')

const config = require('./utils/config')
const logger = require('./utils/logger')

// morgan.token('body', (req, res) => JSON.stringify(req.body))

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
