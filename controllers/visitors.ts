const visitorsRouter = require('express').Router()

const Visitor = require('../models/visitor')
const Timeslot = require('../models/timeslot')

const { response } = require('../app')

import { Request, Response } from 'express'

const randomWords = require('random-words')


/// GET ROUTES

/// POST ROUTES
///

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

module.exports = visitorsRouter