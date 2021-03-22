const app = require('./app')
const http = require('http')

// const config = require('./utils/config')
// const logger = require('./utils/logger')

import { PORT } from './utils/config'
import { info } from './utils/logger'

const server = http.createServer(app)

server.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})
