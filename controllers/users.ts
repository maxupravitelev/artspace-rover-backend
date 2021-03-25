const usersRouter = require('express').Router()

const User = require('../models/user')
const { response } = require('../app')

import { Request, Response } from 'express'

///***** .get routes */

/* .get all scores */
usersRouter.get('/', async (request: Request, response: Response) => {
  const users = await User.find({})
  response.json(users)
})



///***** .post routes */

usersRouter.post('/new-user', async (request: Request, response: Response) => {
    console.log(request.body)
    let user = new User ({
      username: request.body.username,
      password: request.body.password
    })

    const newUser = await user.save()
    response.json(user)

})


module.exports = usersRouter