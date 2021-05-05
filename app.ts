// init express
const express = require('express')
// require('express-async-errors')
const app = express()
const bodyParser = require('body-parser')

// enable cors
const cors = require('cors')

// init middleware
import { PORT, MONGODB_URI } from './utils/config'
import { info, log_error } from './utils/logger'

// const logger = require('./utils/logger')
const usersRouter = require('./controllers/users')
const timeslotsRouter = require('./controllers/timeslots')
const exhibitionsRouter = require('./controllers/exhibitions')
const loginRouter = require('./controllers/login')
const roversRouter = require('./controllers/rovers')
const visitorsRouter = require('./controllers/visitors')


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
    log_error('error connection to MongoDB:', err.message)
  })

// config app & middleware
app.use(cors()) // enable cors
app.use(bodyParser.json())
// app.use(express.static('public')) 
app.use(express.json()) 
app.use(middleware.requestLogger)

// enable routers
app.use('/api/users', usersRouter) 
app.use('/api/timeslots', timeslotsRouter) 
app.use('/api/exhibitions', exhibitionsRouter) 
app.use('/api/login', loginRouter) 
app.use('/api/rovers', roversRouter) 
app.use('/api/visitors', visitorsRouter) 

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app
