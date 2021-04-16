const roversRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Rover = require('../models/rover')
const User = require('../models/user')

const { response } = require('../app')

import { Request, Response } from 'express'


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

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


// update jitsiUrl
roversRouter.put('/updateJitsiUrl/:id', async (request, response) => {

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const body = request.body

  const updatedJitsiUrl = {
    jitsiUrl: body.jitsiUrl,
  }

  const updatedRover = await Rover.findByIdAndUpdate(
    request.params.id,
    updatedJitsiUrl,
    { new: true }
  )

  response.json(updatedRover)
})

// update baseUrl
roversRouter.put('/updateBaseUrl/:id', async (request, response) => {

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const body = request.body

  const updateBaseUrl = {
    roverUrl: body.baseUrl,
  }

  const updatedRover = await Rover.findByIdAndUpdate(
    request.params.id,
    updateBaseUrl,
    { new: true }
  )

  response.json(updatedRover)
})

module.exports = roversRouter