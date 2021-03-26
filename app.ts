// init express
const express = require('express')
// require('express-async-errors')
const app = express()
const bodyParser = require('body-parser')

// enable cors
const cors = require('cors')

// init middleware
import { PORT, MONGODB_URI } from './utils/config'
import { info, error } from './utils/logger'

// const logger = require('./utils/logger')
const usersRouter = require('./controllers/users')
const timeslotsRouter = require('./controllers/timeslots')


const middleware = require('./utils/middleware')



// // init  DB
const mongoose = require('mongoose')


// set up MongoDB Connection
info('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    info('connected to MongoDB')
  })
  .catch((err) => {
    error('error connection to MongoDB:', err.message)
  })

// config app & middleware
app.use(cors()) // enable cors
app.use(bodyParser.json())
app.use('/api/users', usersRouter) // enable user router
app.use('/api/timeslots', timeslotsRouter) // enable timeslots router

// app.use(express.static('public')) // 
app.use(express.json()) 

app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app
