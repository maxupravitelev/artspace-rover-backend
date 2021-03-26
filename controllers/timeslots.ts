const timeslotsRouter = require('express').Router()

const Timeslot = require('../models/timeslot')
const { response } = require('../app')

import { Request, Response } from 'express'

///***** .get routes */

/* .get all scores */
timeslotsRouter.get(
  '/all-timeslots',
  async (request: Request, response: Response) => {
    const timeslots = await Timeslot.find({})
    response.json(timeslots)
  }
)

/* .get all scores */
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
    console.log(request.body)
    let timeslot = new Timeslot({
      username: request.body.username,
      password: request.body.password,
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

        let endTime = String(j + 20)
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

    // let timeslot = new Timeslot ({
    //   username: request.body.username,
    //   password: request.body.password
    // })

    // const newTimeslot = await timeslot.save()
    // response.json(newTimeslot)
    response.json(timeslots)
  }
)

module.exports = timeslotsRouter
