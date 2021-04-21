const visitorsRouter = require('express').Router()

const Visitor = require('../models/visitor')
const Timeslot = require('../models/timeslot')

const { response } = require('../app')

import { Request, Response } from 'express'

/// GET ROUTES

/// POST ROUTES
///

// book timeslot
visitorsRouter.post('/new-visitor/timeslot/:id', async (request: Request, response: Response) => {

  console.log(request.body)

  let passphrase = "test phrase"

  const timeslotInDb = await Timeslot.findById(request.params.id)

  let visitor = new Visitor({
    eMailAddress: request.body.eMailAddress,
    passphrase: passphrase,
    timeslot: timeslotInDb._id
  })

  timeslotInDb.available = false
  timeslotInDb.save()

  const newVisitor = await visitor.save()
  response.json(newVisitor)
}
)

module.exports = visitorsRouter