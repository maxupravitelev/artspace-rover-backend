const timeslotsRouter = require('express').Router()

const Timeslot = require('../models/timeslot')
const { response } = require('../app')

import { Request, Response } from 'express'

///***** .get routes */

/* .get all scores */
timeslotsRouter.get('/all-timeslots', async (request: Request, response: Response) => {
  const timeslots = await Timeslot.find({})
  response.json(timeslots)
})

/* .get all scores */
timeslotsRouter.get('/available-timeslots', async (request: Request, response: Response) => {
  const timeslots = await Timeslot.find({ available: true })
  response.json(timeslots)
})


///***** .post routes */

timeslotsRouter.post('/new-timeslot', async (request: Request, response: Response) => {
    console.log(request.body)
    let timeslot = new Timeslot ({
      username: request.body.username,
      password: request.body.password
    })

    const newTimeslot = await timeslot.save()
    response.json(newTimeslot)

})


module.exports = timeslotsRouter