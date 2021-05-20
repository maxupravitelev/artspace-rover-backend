const exhibitionsRouter = require('express').Router()

const Exhibition = require('../models/exhibition')
const { response } = require('../app')

import { request, response } from 'express'

///***** .get routes */

/* .get all scores */
exhibitionsRouter.get('/', async (request: Request, response: Response) => {
  const exhibitions = await Exhibition.find({}).populate('rovers')
  response.json(exhibitions)
})



///***** .post routes */

exhibitionsRouter.post('/new-exhibition', async (request: Request, response: Response) => {

  console.log(request.body)

  let exhibition = new Exhibition({
    artspace: request.body.artspace,
    rovers: request.body.rovers,
    description: request.body.description,
    openingDay: request.body.openingDay,
    closingDay: request.body.closingDay,
    title: request.body.title,
    bannerImage: request.body.bannerImage
  })

  console.log(exhibition)

  const newExhibition = await exhibition.save()
  response.json(newExhibition)

})


module.exports = exhibitionsRouter