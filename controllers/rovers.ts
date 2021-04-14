const roversRouter = require('express').Router()
const bcrypt = require('bcrypt')

const Rover = require('../models/rover')
const User = require('../models/user')

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

    const user = await User.findById(body.user)

    const rover = new Rover({
      user: body.user,
    })
  
    const savedRover = await rover.save()
    user.rovers = user.rovers.concat(savedRover._id)
    await user.save()

    response.json(savedRover)

})


module.exports = roversRouter