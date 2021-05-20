const visitorsRouter = require('express').Router()

const Visitor = require('../models/visitor')
const Timeslot = require('../models/timeslot')

const { response } = require('../app')

import { request, response } from 'express'

const randomWords = require('random-words')

let sessionState = "session ended"


/// GET ROUTES

// get user data by user id
visitorsRouter.get('/findbyid/:id', async (request: Request, response: Response) => {
  const visitor = await Visitor.findById(request.params.id).populate('timeslot')
  response.json(visitor)
})


// get driving session state
visitorsRouter.get('/checkSession/', async (request: Request, response: Response) => {
  response.json(sessionState)
})

/// POST ROUTES

// book timeslot
visitorsRouter.post('/new-visitor/timeslot/:id', async (request: Request, response: Response) => {

  // works with Math.random, which is alright since security is not an issue while starting streaming sessions
  let passphrase = randomWords({ exactly: 5, join: ' ' })

  const timeslotInDb = await Timeslot.findById(request.params.id)

  let visitor = new Visitor({
    eMailAddress: request.body.eMailAddress,
    passphrase: passphrase,
    timeslot: timeslotInDb._id
  })

  timeslotInDb.available = false
  timeslotInDb.save()

  const newVisitor = await visitor.save()

  const newVisitorInDb = await Visitor.findById(newVisitor._id).populate('timeslot')

  response.json(newVisitorInDb)
  }
)

// check scheduled ride credentials
visitorsRouter.post('/check/', async (request: Request, response: Response) => {

  const visitor = await Visitor.findOne({ eMailAddress: request.body.eMailAddress }).populate('timeslot')
  
  if (!visitor) {
    return response.status(400).json({
      error: 'visitor not found',
    })
  }

  if (visitor.passphrase != request.body.passphrase) {
      return response.status(401).json({
        error: 'invalid password',
      })
    }
  
  const timeNow = Date.now()
  const timeslotStartingTime = Date.parse("2021-04-22T" + visitor.timeslot.startTime + ":00")
  const timeslotEndingTime = Date.parse("2021-04-22T" + visitor.timeslot.endTime + ":00")

  // if (timeNow < timeslotStartingTime) {
  //   return response.status(400).json({
  //     error: `your session has not started yet, please come back on ${visitor.timeslot.startTime} (${visitor.timeslot.date})`,
  //   })
  // }

  // if (timeNow > timeslotEndingTime) {
  //   return response.status(400).json({
  //     error: `your session has already ended, it was booked on ${visitor.timeslot.endTime} (${visitor.timeslot.date})`,
  //   })
  // }

  sessionState = "session started"
  console.log("driving session started")

  response.json('session can be started')
  }
)


// set driving session state
visitorsRouter.post('/endSession', async (request: Request, response: Response) => {
  console.log(request.body)
  const visitor = await Visitor.findOne({ passphrase: request.body.passphrase })
  
  if (!visitor) {
    return response.status(400).json({
      error: 'visitor not found',
    })
  }

  if (visitor.passphrase != request.body.passphrase) {
      return response.status(401).json({
        error: 'invalid password',
      })
    }

  sessionState = "session ended"
  
  console.log("driving session ended")

  response.json(sessionState)
})


module.exports = visitorsRouter