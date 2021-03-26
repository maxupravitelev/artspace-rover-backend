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

timeslotsRouter.post('/generate-timeslots', async (request: Request, response: Response) => {
  
  let date = request.body.date
  let firstTimeSlotOfTheDay = request.body.firstTimeSlotOfTheDay
  let closingTime = request.body.closingTime
  let timeSlotDuration = request.body.timeSlotDuration

  let openingHoursTotal = closingTime - firstTimeSlotOfTheDay
  let timeslots = []

  for (let i = 0; i < openingHoursTotal; i++) {
    for (let j = 0; j < 60; j += timeSlotDuration) {
      timeslots.push({
        date: date,
        startTime: String(firstTimeSlotOfTheDay + i) +":" + String(j),
        endTime: "",
        duration: timeSlotDuration,
        available: true
      })
    }
  }

  // let timeslot = new Timeslot ({
  //   username: request.body.username,
  //   password: request.body.password
  // })

  // const newTimeslot = await timeslot.save()
  // response.json(newTimeslot)
  timeslots.push({"test":"test"})
  response.json(timeslots)

})

module.exports = timeslotsRouter