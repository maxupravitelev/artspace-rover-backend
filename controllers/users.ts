const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

const User = require('../models/user')
const { response } = require('../app')

import { Request, Response } from 'express'

///***** .get routes */

/* .get all users */
usersRouter.get('/', async (request: Request, response: Response) => {
  const users = await User.find({})
  response.json(users)
})


// get user data by user id
usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id).populate('rovers')
  response.json(user)
})


///***** .post routes */

usersRouter.post('/new-user', async (request: Request, response: Response) => {
    const body = request.body

    if (body.password.length < 3 || body.password.username < 3) {
      return response
        .status(400)
        .json({ error: 'username and password must be at least 3 chars long' })
    }
  
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
  
    const user = new User({
      username: body.username,
      // name: body.name,
      passwordHash,
    })
  
    const savedUser = await user.save()
  
    response.json(savedUser)

})


module.exports = usersRouter