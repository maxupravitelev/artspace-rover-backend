const usersRouter = require('express').Router()
const User = require('../models/user')
const { response } = require('../app')


///***** .get routes */

/* .get all scores */
usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})



///***** .post routes */

usersRouter.post('/new-user', async (request, response) => {
    console.log(request.body)
    let user = new User ({
      username: request.body.username,
      password: request.body.password
    })

    const newUser = await user.save()
    response.json(user)

})


module.exports = usersRouter