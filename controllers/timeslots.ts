const timeslotsRouter = require('express').Router()

const Timeslot = require('../models/timeslot')
const { response } = require('../app')

import { Request, Response } from 'express'

///***** .get routes */

/* get all timeslots */
timeslotsRouter.get(
  '/all-timeslots',
  async (request: Request, response: Response) => {
    const timeslots = await Timeslot.find({})
    response.json(timeslots)
  }
)

/* get all timeslots */
timeslotsRouter.get(
  '/available-timeslots',
  async (request: Request, response: Response) => {
    const timeslots = await Timeslot.find({ available: true })
    response.json(timeslots)
  }
)

///***** .post routes */

timeslotsRouter.post(
  '/new-timeslot',
  async (request: Request, response: Response) => {
    let timeslot = new Timeslot({
      date: request.body.date,
      startTime: request.body.startTime,
      endTime: request.body.endTime,
      duration: request.body.duration,
      available: request.body.available,
    })

    const newTimeslot = await timeslot.save()
    response.json(newTimeslot)
  }
)

timeslotsRouter.post(
  '/generate-timeslots',
  async (request: Request, response: Response) => {
    let date = request.body.date
    let firstTimeSlotOfTheDay = request.body.firstTimeSlotOfTheDay
    let closingTime = request.body.closingTime
    let timeSlotDuration = request.body.timeSlotDuration

    let openingHoursTotal = closingTime - firstTimeSlotOfTheDay
    let timeslots = []

    for (let i = 0; i < openingHoursTotal; i++) {
      for (let j = 0; j < 60; j += timeSlotDuration) {
        let hourStart = String(firstTimeSlotOfTheDay + i)
        let hourEnd = String(firstTimeSlotOfTheDay + i)
        let minutes = String(j)

        if (minutes == '0') {
          minutes = '00'
        }

        let endTime = String(j + timeSlotDuration)
        if (endTime == '60') {
          endTime = '00'
          hourEnd = String(firstTimeSlotOfTheDay + i + 1)
        }

        timeslots.push({
          date: date,
          startTime: hourStart + ':' + minutes,
          endTime: hourEnd + ':' + endTime,
          duration: timeSlotDuration,
          available: true,
        })
      }
    }

    let timeslotsInDb = []

    for (let i = 0; i < timeslots.length; i++) {
      const newTimeslot = new Timeslot(timeslots[i])
      const timeslotInDb = await newTimeslot.save()
      timeslotsInDb.push(timeslotInDb)
    }

    // let timeslot = new Timeslot ({
    //   username: request.body.username,
    //   password: request.body.password
    // })

    // const newTimeslot = await timeslot.save()
    // response.json(newTimeslot)
    response.json(timeslotsInDb)
  }
)

module.exports = timeslotsRouter
