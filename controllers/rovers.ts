const roversRouter = require('express').Router()
const bcrypt = require('bcrypt')

const Rover = require('../models/rover')
const { response } = require('../app')

import { Request, Response } from 'express'

///***** .get routes */

/* .get all rovers */
roversRouter.get('/', async (request: Request, response: Response) => {
  const rovers = await User.find({})
  response.json(rovers)
})

///***** .post routes */

roversRouter.post('/new-rover', async (request: Request, response: Response) => {
    const body = request.body

    const rover = new Rover({
      userId: body.userId,
    })
  
    const savedRover = await rover.save()
  
    response.json(savedRover)

})


module.exports = roversRouter