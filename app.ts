// init express
const express = require('express')
require('express-async-errors')
const app = express()

// enable cors
const cors = require('cors')

// init middleware
import { PORT, MONGODB_URI } from './utils/config'
import { info } from './utils/logger'

// const logger = require('./utils/logger')
const middleware = require('./utils/middleware')



// // init  DB
// const mongoose = require('mongoose')


// set up MongoDB Connection
info('connecting to', MONGODB_URI)

// mongoose
//   .connect(config.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     info('connected to MongoDB')
//   })
//   .catch((error) => {
//     error('error connection to MongoDB:', error.message)
//   })

// config app & middleware
app.use(cors()) // enable cors
// app.use('/api/scores', scoreRouter) // enable highscore router
// app.use(express.static('public')) // folder for games files
app.use(express.json()) 
app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app