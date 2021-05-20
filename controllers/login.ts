const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

import { request, response } from 'express'

// post login data to backend and check credentials
loginRouter.post('/', async (request: Request, response: Response) => {
  const body = request.body

  let user = await User.findOne({ username: body.username }).populate('rovers')

  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    })
  }


  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user._id, rovers: user.rovers })
})

module.exports = loginRouter
